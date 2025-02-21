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
import { zUsers } from "@/core/models/user.model";
import { getUsers } from "@/core/services/user.service";

const PICK_FILTER: any = () => {
  return { question_text: true }
}

export default async function UsersDatatable({ searchParams }: Omit<PageProps, "params">) {
  const q = await searchParams;
  const { data: query } = datatableStateSchemaOld.safeParse(q)

  const res = await getUsers({
    query: transformQueryOld(query!, zUsers.BASE.pick(PICK_FILTER()).keyof().options),
  })

  const { data, rowCount } = res

  console.log(data)

  const { data: parsedData = [], error } = zUsers.LIST.safeParse(data)

  return (
    <>
      <pre>
        {JSON.stringify(error, null, 2)}
      </pre>
      <ServerResponseHandler
        success={res.success}
        message={res.success ? res?.message : ""}
        error={!res.success ? res?.error : ""}
      />
      <DatatableWrapperRouter data={parsedData} columns={columns} rowCount={rowCount}>
        <SimpleDatatableTemplate
          search={<FilterRouter fields={PICK_FILTER()} placeholder={"Search..."} />}
          actions={
            <>
              <Button asChild><Link href={"/v1/users/create"}>Create</Link></Button>
            </>
          }
        />
      </DatatableWrapperRouter>
    </>
  )
}