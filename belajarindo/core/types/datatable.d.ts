import { z } from "zod";
import { ColumnFilter, ColumnSort, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";

export type PageProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

const filterDefaultSchema = z.object({
  id: z.string(),
  value: z.string(),
  operator: z.enum(["=", ">", ">=", "<", "<=", "like", "ilike"]).nullable().optional(),
  condition: z.enum(["and", "or"]).nullable().optional(),
})

const filterInSchema = filterDefaultSchema.extend({
  value: z.string().array(),
  operator: z.literal("in")
})

const filterSchema = z.discriminatedUnion(
  "operator", [
  filterDefaultSchema,
  filterInSchema
])

export type ColumnFiltersOld = Array<ColumnFilter & z.infer<typeof filterSchema>>

export const datatableStateSchemaOld = z.object({
  sorting: z.string().transform((v) => JSON.parse(v) as SortingState).catch([]),
  columnFilters: z.string().transform((v) => JSON.parse(v) as ColumnFiltersOld).catch([]),
  columnVisibility: z.string().transform((v) => JSON.parse(v) as VisibilityState).catch({}),
  pagination: z.string().transform((v) => JSON.parse(v) as PaginationState).catch({ pageIndex: 0, pageSize: 10 }),
  q: z.string().default("")
})

export type DatatableQueryParamsOld = Partial<z.infer<typeof datatableStateSchemaOld>>

const filterIdSchema = filterDefaultSchema.extend({
  id: z.string().includes("id"),
  operator: z.literal("="),
  value: z.string().uuid()
})

export type FilterGroup = z.infer<typeof filterIdSchema>
  | z.infer<typeof filterDefaultSchema>
  | z.infer<typeof filterInSchema>
  | {
    operator: 'group',
    value: FilterGroup[],
    condition?: 'and' | 'or' | null
  }

export const filterGroupSchema: z.ZodType<FilterGroup[]> = z.array(
  z.union([
    filterIdSchema,
    z.discriminatedUnion("operator", [
      filterDefaultSchema,
      filterInSchema,
      filterDefaultSchema.omit({ id: true }).extend({
        operator: z.literal('group'),
        value: z.lazy(() => filterGroupSchema),
      }),
    ])
  ])
);

export type ColumnFilters = z.infer<typeof filterGroupSchema>;

export const datatableStateSchema = datatableStateSchemaOld.extend({
  columnFilters: z.string().transform((v) => JSON.parse(v) as ColumnFilters).catch([]),
})

export type DatatableQueryParams = z.infer<typeof datatableStateSchema>

export type FilterGroupBackend = {
  property: string
  value: string | string[]
  op: "=" | ">" | ">=" | "<" | "<=" | "like" | "ilike" | "in"
  cond: "and" | "or"
} | {
  property: "children"
  value: FilterGroupBackend[]
  cond: "and" | "or"
  op: "="
}

export const filterGroupTransformer: z.ZodEffects<z.ZodType<FilterGroup[]>, FilterGroupBackend[], FilterGroup[]> = filterGroupSchema
  .transform((filter) =>
    filter.map(f => {
      if (f.operator === 'group') {
        return {
          property: 'children',
          value: filterGroupTransformer.parse(f.value),
          op: '=',
          cond: f.condition ?? 'and',
        };
      }
      if (f.id.includes("id")) {
        return {
          property: f.id,
          value: f.value,
          op: '=',
          cond: f.condition ?? 'and',
        }
      }
      return {
        property: f.id,
        value: f.value,
        op: f.operator ?? '=',
        cond: f.condition ?? 'and',
      };
    })
  )

export const sortTransformer = z.array<z.ZodType<ColumnSort>>(
  z.object({
    id: z.string(),
    desc: z.boolean()
  })
).transform(
  (v) =>
    v.map(({ id, desc }) => ({ property: id, dir: desc ? "desc" : "asc" }))
)

export type SortBackend = z.infer<typeof sortTransformer>