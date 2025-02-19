import { getLessonsByCourse } from "@/core/services/lesson.service"
import LessonCard from "../../../_components/lesson-card"
import { getCourseById } from "@/core/services/course.service"

export const metadata = {
  title: 'BIPA 3 Lessons | Belajar Indo',
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params
  const [course, res] = await Promise.all([getCourseById({ id }) as any, getLessonsByCourse({ course_id: id, query: '' })])

  const { data, rowCount } = res
  return (
    <>
      {course?.data && <h4 className="text-xl font-semibold my-1">{course.data?.name ?? 'No Title'}</h4>}
      <div className="grid auto-rows-min gap-3">
        <LessonCard data={data ?? []} />
      </div>
    </>
  )
}