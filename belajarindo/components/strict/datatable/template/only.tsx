"use client"

import { DataTable, PageEntries, Pagination, RowPerPage, Visibility } from "@/components/composite/datatable";

type SimpleDatatableTemplateProps = {
  search?: React.ReactNode,
  actions?: React.ReactNode,
  meta?: React.ReactNode
}

export default function DatatableOnlyTemplate({ meta }: SimpleDatatableTemplateProps) {
  return (
    <div className={"space-y-4"}>
      <DataTable />
      {/* <div className={"flex items-center gap-2 md:gap-4"}>
        {meta ? meta : <PageEntries />}
        <RowPerPage className={"ml-auto"} />
        <Pagination className={"mx-0"} />
      </div> */}
    </div>
  )
}