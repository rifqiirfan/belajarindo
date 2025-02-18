import { Metadata } from "next";
import { Suspense } from "react";
import { PageProps } from "@/core/types/datatable";
import { Card, CardContent } from "@/components/ui/card";
import { SkeletonDatatable } from "@/components/composite/skeletons/datatable";
import { ProtectDefault } from "@/components/composite/protects";
import UsersDatatable from "./_components/datatable";

export const metadata: Metadata = {
  title: "User",
  description: "Master Data User"
}

export const revalidate = 0

export const dynamic = "force-dynamic"

export default async function Page({ searchParams }: PageProps) {
  return (
    <ProtectDefault role="org:admin">
      {/* <Large>Users</Large> */}
      <Card className="">
        <CardContent>
          <Suspense fallback={<SkeletonDatatable />}>
            <UsersDatatable searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </ProtectDefault>
  )
}