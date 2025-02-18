"use client"

import { DataTable, PageEntries, Pagination, RowPerPage, Visibility } from "@/components/composite/datatable";

type SimpleDatatableTemplateProps = {
  search?: React.ReactNode,
  actions?: React.ReactNode,
  meta?: React.ReactNode
}

export default function SimpleDatatableTemplate({ search, actions, meta }: SimpleDatatableTemplateProps) {
  return (
    <div className={"space-y-4"}>
      <div className="flex items-center justify-between">
        {/* <div className={"flex items-center gap-2 md:gap-4"}> */}
        {/* <div className={"flex items-center gap-2 md:gap-4"}> */}
        <div className="flex flex-1 items-center space-x-2">
          {search}
        </div>
        {/* </div> */}
        <div className={"flex items-center gap-2 md:gap-4"}>
          <Visibility />
          {actions}
        </div>
        {/* </div> */}
      </div>
      <DataTable />
      <div className={"flex items-center gap-2 md:gap-4"}>
        {meta ? meta : <PageEntries />}
        <RowPerPage className={"ml-auto"} />
        <Pagination className={"mx-0"} />
      </div>
    </div>
  )
}