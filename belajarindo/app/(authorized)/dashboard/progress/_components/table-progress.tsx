"use server"

import { columns } from "./columns";
import { datatableStateSchemaOld, PageProps } from "@/core/types/datatable";
import SimpleDatatableTemplate from "@/components/strict/datatable/template/simple";
import { FilterRouter } from "@/components/composite/datatable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DatatableWrapperRouter from "@/components/strict/datatable/wrapper/server/router";
import ServerResponseHandler from "@/components/strict/server-response-handler";
import { transformQueryOld } from "@/core/utilities/datatableUtils";
import { zAchievements } from "@/core/models/achievement.model";
import { getAchievements } from "@/core/services/achievement.service";
import DatatableOnlyTemplate from "@/components/strict/datatable/template/only";

const PICK_FILTER: any = () => {
  return { name: true }
}

export default async function MyProgressDatatable({ searchParams }: Omit<PageProps, "params">) {
  const q = await searchParams;
  const res = await getAchievements({})

  const { data, rowCount } = res

  return (
    <>
      <ServerResponseHandler
        success={res.success}
        message={res.success ? res?.message : ""}
        error={!res.success ? res?.error : ""}
      />
      <DatatableWrapperRouter data={data} columns={columns} rowCount={rowCount}>
        <DatatableOnlyTemplate />
      </DatatableWrapperRouter>
    </>
  )
}