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
import { getCourses, getCoursesLessons } from "@/core/services/course.service";
import { zCourses } from "@/core/models/course.model";

const PICK_FILTER: any = () => {
  return { name: true }
}

export default async function CoursesDatatable({ searchParams }: Omit<PageProps, "params">) {
  const q = await searchParams;
  const { data: query } = datatableStateSchemaOld.safeParse(q)

  const res = await getCoursesLessons({
    query: transformQueryOld(query!, zCourses.BASE.pick(PICK_FILTER()).keyof().options),
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
              <Button asChild><Link href={"/v1/courses/create"}>Create</Link></Button>
            </>
          }
        />
      </DatatableWrapperRouter>
    </>
  )
}