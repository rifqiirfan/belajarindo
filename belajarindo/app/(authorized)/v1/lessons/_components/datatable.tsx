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
import { zLessons } from "@/core/models/lesson.model";
import { getLessons, getLessonsRelation } from "@/core/services/lesson.service";

const PICK_FILTER: any = () => {
  return { name: true }
}

export default async function LessonsDatatable({ searchParams }: Omit<PageProps, "params">) {
  const q = await searchParams;
  const { data: query } = datatableStateSchemaOld.safeParse(q)
  
  const res = await getLessonsRelation({
    query: transformQueryOld(query!, zLessons.BASE.pick(PICK_FILTER()).keyof().options),
  })

  const { data, rowCount } = res

  return (
    <>
      <ServerResponseHandler
        success={res.success}
        message={res.success ? res?.message : ""}
        error={!res.success ? res?.error : ""}
      />
      <DatatableWrapperRouter data={data} columns={columns} rowCount={rowCount}>
        <SimpleDatatableTemplate
          search={<FilterRouter fields={PICK_FILTER()} placeholder={"Search..."} />}
          actions={
            <>
              <Button asChild><Link href={"/v1/lessons/create"}>Create</Link></Button>
            </>
          }
        />
      </DatatableWrapperRouter>
    </>
  )
}