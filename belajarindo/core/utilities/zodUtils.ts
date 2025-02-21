import { toCapitalizedWords } from "@/lib/utils";
import { z } from "zod"
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { transformFiltersOld, transformSortingOld } from "./datatableUtils";
import { ColumnFiltersOld } from "../types/datatable";

const zSetupConfig = (label: string) => {
	const column = toCapitalizedWords(label);
	const zParamConfig = {
		required_error: `${column} is required.`,
		invalid_type_error: `${column} is required.`,
	}

	return { column, zParamConfig }
}

export const zOptional = <T extends z.ZodTypeAny>(schema: T) => {
	return z.union([schema, z.literal("")]).nullish().optional()
}

/* Transform Fallback */
export function zodFallback<T extends z.ZodTypeAny>(schema: T) {
	return schema.nullish().transform((v) => v || "-")
}

export function zFallbackString(f: string = "-") {
	return z.string().nullish().transform((v) => v || f);
}

export function zFallbackUuid(f: string = "-") {
	return z.string().nullish().transform((v) => v || f);
}

export function zFallbackNumber(f: number = 0) {
	return z.coerce.number().nullable().transform((v) => v || f)
}

export function zFallbackDate(f: string = "yyyy-MM-dd") {
	return z.coerce.date().nullish().transform((v) => v ? format(v, f, { locale: enUS }) : "-");
}

export function zFallbackDatetime(f: string = "yyyy-MM-dd HH:mm") {
	return z.coerce.date().nullish().transform((v) => v ? format(v, f, { locale: enUS }) : "-");
}

/* Fields */
export const zFieldUuid = (label: string, isRequired: boolean = false) => {
	const { column, zParamConfig } = zSetupConfig(label)

	const schema = z.string({ ...zParamConfig }).uuid(`${column} is required.`)
	if (isRequired) { return schema.min(1, `${column} is required.`) }

	return schema;
}

export const zFieldText = (label: string, isRequired: boolean = false) => {
	const { column, zParamConfig } = zSetupConfig(label)

	const schema = z.string({ ...zParamConfig })
	if (isRequired) { return schema.min(1, `${column} is required.`) }

	return schema;
}

export const zFieldNumber = (label: string) => {
	const { zParamConfig } = zSetupConfig(label)
	return z.coerce.number({ ...zParamConfig })
}

export const zFieldBoolean = (label: string) => {
	const { zParamConfig } = zSetupConfig(label)
	return z.boolean({ ...zParamConfig });
}

export const zFieldDate = (label: string) => {
	const { column, zParamConfig } = zSetupConfig(label)
	const zNewParam: any = { ...zParamConfig, invalid_date: `${column} is required.` }
	return z.coerce.date({
		errorMap: (issue, { defaultError }) => ({
			message: issue.code in zNewParam ? zNewParam[issue.code] : defaultError,
		}),
	})
}

export const zFieldEmail = (label: string) => {
	const { column, zParamConfig } = zSetupConfig(label)
	return z.string({ ...zParamConfig }).email(`${column} is invalid`)
}

const uuidSchema = z.string().uuid();

function transformStringFieldsOld(input: string, search: string): ColumnFiltersOld {
	const fields = input.split(',');
	const { data: parsedSearch, success } = uuidSchema.safeParse(search);

	const filteredFields = success
		? fields.filter(field => field.includes("id"))
		: fields.filter(field => !field.includes("id"));

	return filteredFields.map((field, i) => ({
		id: field.trim(),
		operator: success ? "=" : "ilike",
		value: success ? parsedSearch : search,
		condition: i === 0 ? 'and' : 'or',
	}));
}

export function sParamComboboxGeneral(search: string, fields: string = 'id,name', options?: { filter: ColumnFiltersOld }) {
	const obj = {
		page: (1).toString(),
		page_size: (100).toString(),
		sort: JSON.stringify(transformSortingOld([])),
		filter: JSON.stringify(transformFiltersOld([
			...(options?.filter ?? []),
			...transformStringFieldsOld(fields, search)
		])),
		fields: fields
	}

	const queryParams = Object.entries(obj)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&');

	return queryParams;
}