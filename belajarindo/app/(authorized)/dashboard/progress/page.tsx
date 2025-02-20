import { ProtectDefault } from "@/components/composite/protects"
import { Card, CardContent } from "@/components/ui/card"
import { Suspense } from "react"
import MyProgressDatatable from "./_components/table-progress"
import { SkeletonDatatable } from "@/components/composite/skeletons/datatable"
import { PageProps } from "@/core/types/datatable"

export const metadata = {
  title: 'Progress | Belajar Indo',
}

export default function Page({ searchParams }: PageProps) {
  return (
    <ProtectDefault role="org:admin,org:user">
      {/* <Large>Achievements</Large> */}
      <div className="bg-white">
        <Suspense fallback={<SkeletonDatatable />}>
          <MyProgressDatatable searchParams={searchParams} />
        </Suspense>
      </div>
    </ProtectDefault>
  )
}