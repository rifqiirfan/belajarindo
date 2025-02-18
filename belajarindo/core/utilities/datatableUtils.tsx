import { SortingState } from "@tanstack/react-table";
import {
  ColumnFilters,
  ColumnFiltersOld, DatatableQueryParams,
  DatatableQueryParamsOld, FilterGroupBackend,
  filterGroupTransformer, SortBackend, sortTransformer
} from "@/core/types/datatable";

export const transformSortingOld = (sorting: SortingState) => {
  return sorting.map((v) => ({ property: v.id, dir: v.desc ? "desc" : "asc" }))
}

export const transformFiltersOld = (columnFilters: ColumnFiltersOld) => {
  return columnFilters.map((v, i) => ({
    property: v.id,
    value: v.value,
    op: v.operator,
    cond: i === 0 ? "and" : (v.condition ? v.condition : "or")
  }))
}

export const transformQueryOld = (query: DatatableQueryParamsOld, keys: string[] = []) => {
  const generalSearch: ColumnFiltersOld = query?.q ?
    keys.map((k, i) => ({ id: k, value: query.q || "", operator: "ilike", condition: i === 0 ? "and" : "or" }))
    : []

  const obj = {
    page: ((query?.pagination?.pageIndex ?? 0) + 1).toString(),
    page_size: query?.pagination?.pageSize.toString() || "10",
    sort: JSON.stringify(transformSortingOld(query?.sorting || [])),
    filter: JSON.stringify(transformFiltersOld([
      ...(query?.columnFilters || []),
      ...generalSearch,
    ])),
  }

  return new URLSearchParams(obj)
}

export const transformFilters = (columnFilters: ColumnFilters): FilterGroupBackend[] => {
  try {
    return filterGroupTransformer.parse(columnFilters)
  } catch (e: any) {
    console.info(e)
    return []
  }
}

export const transformSorting = (sorting: SortingState): SortBackend => {
  try {
    return sortTransformer.parse(sorting)
  } catch (e) {
    console.info(e)
    return []
  }
}

export const transformQuery = (query: Partial<DatatableQueryParams>, keys: string[] = []) => {
  const generalSearch: ColumnFilters = query.q
    ? keys.map((k) => ({ operator: "ilike", id: k, value: query.q || "", condition: "or" }))
    : []

  const obj = {
    page: ((query.pagination?.pageIndex ?? 0) + 1).toString(),
    page_size: (query.pagination?.pageSize ?? 10).toString(),
    sort: JSON.stringify(transformSorting(query.sorting || [])),
    filter: JSON.stringify(transformFilters([
      ...(query.columnFilters || []),
      {
        operator: "group",
        value: generalSearch,
        condition: "and"
      }
    ])),
  }

  return new URLSearchParams(obj)
}