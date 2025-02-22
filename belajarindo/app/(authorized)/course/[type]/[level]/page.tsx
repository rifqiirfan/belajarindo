import CourseCard from "../../_components/course-card";
import { getCoursesByLevel } from "@/core/services/course.service";
import {courseSchema, courseTypeSchema} from "@/core/features/Course/course.model";
import {notFound} from "next/navigation";
import {IPassedBipa} from "@/app/(authorized)/course/_components/types";

type PageParams = Promise<{ type: string, level: string}>

export const generateMetadata = async ({params}: {params: PageParams}) => {
  const { type, level } = await params
  return {
    title: `${type} ${level} Courses | Belajar Indo`,
  }
}

export default async function Page({params}: {params: PageParams}) {
  const {type, level } = await params
  const {success} = courseSchema.safeParse({type, level})

  if (!success) {
    notFound()
  }

  const res = await getCoursesByLevel({ bipa: level, query: '' })
  const { data, rowCount } = res

  return (
    <div className="grid auto-rows-min gap-4">
      <CourseCard type={level.replace("-", "_") as IPassedBipa} data={data ?? []} />
    </div>
  )
}