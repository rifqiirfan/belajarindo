import { getLessonsByCourse } from "@/core/services/lesson.service"
import LessonCard from "../../../_components/lesson-card"
import { getCourseById } from "@/core/services/course.service"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {IPassedBipa} from "@/app/(authorized)/course/_components/types";

type PageParams = Promise<{ type: string, level: string, id: string}>

export const generateMetadata = async ({params}: {params: PageParams}) => {
  const { type, level } = await params
  return {
    title: `${type} ${level} Course Lessons | Belajar Indo`,
  }
}

export default async function Page({ params }: { params: PageParams }) {
  const { id, type, level } = await params
  const [course, res] = await Promise.all([getCourseById({ id }) as any, getLessonsByCourse({ course_id: id, query: '' })])

  const { data, rowCount } = res
  return (
    <>
      <div className="navigation-back flex">
        <Button className='text-[13px] justify-start' size={'sm'} variant={'outline'} asChild>
          <Link href={`/course/${type}/${level}`}>
            Back to Courses
          </Link>
        </Button>
      </div>
      {course?.data && <h4 className="text-xl font-semibold my-1">{course.data?.name ?? 'No Title'}</h4>}
      <div className="grid auto-rows-min gap-3">
        <LessonCard type={level.replace("-", "_") as IPassedBipa} course={course?.data} data={data ?? []} />
      </div>
    </>
  )
}