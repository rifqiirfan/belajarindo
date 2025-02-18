"use client"

import {DatatableProvider} from "@/components/composite/datatable";
import {Reducer, useCallback, useMemo, useReducer} from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  TableState,
  Updater,
  useReactTable,
  VisibilityState
} from "@tanstack/react-table";
import {useQuery} from "@tanstack/react-query";
import {SkeletonDatatable} from "@/components/fabrication/skeletons/datatable";
import {ColumnFiltersOld} from "@/types/datatable";
import {ActionGetListData, ActionResponse} from "@/core/types/response";n
import {queryFnResponseHandler} from "@/utilities/reactQueryUtils";

type PickTableState = Pick<TableState, "pagination" | "rowSelection" | "sorting" | "columnVisibility" | "globalFilter">

type DatatableState = Omit<PickTableState, "globalFilter"> & {
  q: string,
  columnFilters: ColumnFiltersOld
}

const defaultTableState: PickTableState = {
  pagination: {pageIndex: 0, pageSize: 10},
  rowSelection: {},
  sorting: [],
  columnVisibility: {},
  globalFilter: ""
}

const reducer = (state: PickTableState, action: { type: string, payload: any }) => {
  switch (action.type) {
    case 'SET_STATE':
      return {...state, ...action.payload};
    case 'SET_SORTING':
      return {...state, sorting: action.payload};
    case 'SET_PAGINATION':
      return {...state, pagination: action.payload};
    case 'SET_COLUMN_VISIBILITY':
      return {...state, columnVisibility: action.payload};
    case 'SET_ROW_SELECTION':
      return {...state, rowSelection: action.payload};
    case 'SET_GLOBAL_FILTER':
      return {...state, globalFilter: action.payload};
    default:
      return state;
  }
};

type DatatableWrapperProps<T> = {
  children: React.ReactNode,
  uniqueKey: string[],
  getData: (arg: { sorting: SortingState, pagination: PaginationState, columnFilters: ColumnFiltersOld, q: string })
    => Promise<ActionResponse<ActionGetListData<T>>>,
  columns: ColumnDef<T>[],
  initialState?: Partial<DatatableState>
}

export default function DatatableWrapper<T>({
                                              children,
                                              uniqueKey,
                                              getData,
                                              columns,
                                              initialState = {},
                                            }: DatatableWrapperProps<T>) {
  const {q, columnFilters, ...restTableState} = initialState

  const [tableState, dispatch] = useReducer<Reducer<PickTableState, { type: string, payload: any }>>(reducer, {
    ...defaultTableState, ...restTableState,
    globalFilter: q || ""
  })

  const queryDatatableState = useMemo(() => ({
    sorting: tableState.sorting,
    pagination: tableState.pagination,
    q: tableState.globalFilter as string,
    columnFilters: columnFilters ?? []
  }), [tableState.sorting, tableState.pagination, tableState.globalFilter, columnFilters])

  const {data: {data, rowCount} = {data: [], rowCount: 0}, isFetching} = useQuery({
    queryKey: [...uniqueKey, [tableState.sorting, tableState.pagination, tableState.globalFilter, columnFilters]],
    queryFn: () => queryFnResponseHandler(getData(queryDatatableState)),
    staleTime: 60 * 1000
  })

  const setPagination = useCallback((updatePagination: Updater<PaginationState>) => {
    dispatch({
      type: 'SET_PAGINATION',
      payload: typeof updatePagination === 'function' ? updatePagination(tableState.pagination) : updatePagination
    });
  }, [dispatch, tableState.pagination]);
  const setSorting = useCallback((updateSorting: Updater<SortingState>) => {
    dispatch({
      type: 'SET_SORTING',
      payload: typeof updateSorting === 'function' ? updateSorting(tableState.sorting) : updateSorting
    });
  }, [dispatch, tableState.sorting]);
  const setColumnVisibility = useCallback((updateColumnVisibility: Updater<VisibilityState>) => {
    dispatch({
      type: 'SET_COLUMN_VISIBILITY',
      payload: typeof updateColumnVisibility === 'function' ? updateColumnVisibility(tableState.columnVisibility) : updateColumnVisibility
    });
  }, [dispatch, tableState.columnVisibility]);
  const setRowSelection = useCallback((updateRowSelection: Updater<RowSelectionState>) => {
    dispatch({
      type: 'SET_ROW_SELECTION',
      payload: typeof updateRowSelection === 'function' ? updateRowSelection(tableState.rowSelection) : updateRowSelection
    });
  }, [dispatch, tableState.rowSelection]);
  const handleStateChange = useCallback((updater: Updater<TableState>) => {
    dispatch({type: 'SET_STATE', payload: typeof updater === 'function' ? updater(tableState as TableState) : updater});
  }, [dispatch, tableState]);

  const table = useReactTable({
    data: data,
    columns: columns,
    rowCount: rowCount,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    manualSorting: true,
    enableColumnFilters: false,
    manualFiltering: true,
    onStateChange: handleStateChange,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: tableState,
  })

  if (isFetching) return (
    <SkeletonDatatable/>
  )

  return (
    <DatatableProvider data={{table}}>
      {children}
    </DatatableProvider>
  )
}