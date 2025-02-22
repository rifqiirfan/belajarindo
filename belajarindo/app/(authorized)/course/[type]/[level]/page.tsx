import CourseCard from "../../_components/course-card";
import { getCoursesByLevel } from "@/core/services/course.service";
import {courseSchema, courseTypeSchema} from "@/core/features/Course/course.model";
import {notFound} from "next/navigation";
import {IPassedBipa} from "@/app/(authorized)/course/_components/types";

// export const metadata = {
//   title: 'Beginner BIPA 1 Courses | Belajar Indo',
// }

export const generateMetadata = ({params: {type, level}}: {params: {type: string, level: string}}) => {
  return {
    title: `${type} ${level} Courses | Belajar Indo`,
  }
}

export default async function Page({params: {type, level}}: {params: {type: string, level: string}}) {
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