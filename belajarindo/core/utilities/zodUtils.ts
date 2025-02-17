import { toCapitalizedWords } from "@/lib/utils";
// import { fieldConfig } from "@autoform/zod"
import { z } from "zod"
// import { transformFilters, transformFiltersOld, transformSortingOld } from "./datatableUtils";
// import { ColumnFilters, ColumnFiltersOld, DatatableQueryParams } from "@/types/datatable";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

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

// export const zFieldTextarea = (label: string, isRequired: boolean = false) => {
// 	const { column, zParamConfig } = zSetupConfig(label)

// 	const schema = z.string({ ...zParamConfig })
// 	if (isRequired) { schema.min(1, `${column} is required.`) }

// 	return schema.superRefine(
// 		fieldConfig({ fieldType: "textarea" })
// 	);
// }

// export const zFieldCombobox = (
// 	label: string,
// 	options: Array<unknown> = [],
// 	getOptions: (arg: { search: string }) => Promise<{ value: string, label: string }[]> = () => Promise.resolve([]),
// 	uniqueKey: Array<string> = [],
// ) => {
// 	const { column, zParamConfig } = zSetupConfig(label)
// 	return z.string({ ...zParamConfig }).superRefine(
// 		fieldConfig({
// 			label: column,
// 			fieldType: "combobox",
// 			customData: {
// 				options,
// 				getOptions,
// 				uniqueKey
// 			}
// 		})
// 	)
// }

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

// export const zFieldPassword = (label: string) => {
// 	const { zParamConfig } = zSetupConfig(label)
// 	return z.string({ ...zParamConfig }).superRefine(
// 		fieldConfig({
// 			fieldType: "password",
// 		})
// 	)
// }

const uuidSchema = z.string().uuid();

// function transformStringFieldsOld(input: string, search: string): ColumnFiltersOld {
// 	const fields = input.split(',');
// 	const { data: parsedSearch, success } = uuidSchema.safeParse(search);

// 	const filteredFields = success
// 		? fields.filter(field => field.includes("id"))
// 		: fields.filter(field => !field.includes("id"));

// 	return filteredFields.map((field, i) => ({
// 		id: field.trim(),
// 		operator: success ? "=" : "ilike",
// 		value: success ? parsedSearch : search,
// 		condition: i === 0 ? 'and' : 'or',
// 	}));
// }

// export function sParamDatatable(options?: { page?: number, page_size?: number, fields?: string, filter: ColumnFiltersOld }) {
// 	const obj = {
// 		page: (options?.page ?? 1), //.toString(),
// 		page_size: (options?.page_size ?? 100), // (100).toString(),
// 		sort: JSON.stringify(transformSortingOld([])),
// 		filter: JSON.stringify(transformFiltersOld([
// 			...(options?.filter ?? []),
// 		])),
// 		...(options?.fields && { fields: options?.fields }),
// 	}

// 	const queryParams = Object.entries(obj)
// 		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
// 		.join('&');

// 	return queryParams;
// }

// export function sParamComboboxGeneral(search: string, fields: string = 'id,name', options?: { filter: ColumnFiltersOld }) {
// 	const obj = {
// 		page: (1).toString(),
// 		page_size: (100).toString(),
// 		sort: JSON.stringify(transformSortingOld([])),
// 		filter: JSON.stringify(transformFiltersOld([
// 			...(options?.filter ?? []),
// 			...transformStringFieldsOld(fields, search)
// 		])),
// 		fields: fields
// 	}

// 	console.log(obj.filter)

// 	const queryParams = Object.entries(obj)
// 		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
// 		.join('&');

// 	return queryParams;
// }

// export function sParamComboboxByGroup({ q = "", pagination = { pageIndex: 0, pageSize: 100 }, columnFilters = [], columnVisibility = { id: true, name: true } }: Partial<Omit<DatatableQueryParams, "sorting">>) {
// 	const fields = Object.keys(columnVisibility)

// 	const generalSearch: ColumnFilters = q ? fields.filter((f) => !f.includes("id")).map((k) => ({ id: k, value: q || "", operator: "ilike", condition: "or" })) : []
// 	const obj = {
// 		page: ((pagination?.pageIndex ?? 0) + 1).toString(),
// 		page_size: (pagination?.pageSize ?? 100).toString(),
// 		filter: JSON.stringify(transformFilters([
// 			...columnFilters,
// 			{
// 				operator: "group",
// 				value: generalSearch,
// 				condition: "and"
// 			}
// 		])),
// 		fields: fields.join(","),
// 	}

// 	console.log(obj)

// 	return new URLSearchParams(obj).toString()
// }