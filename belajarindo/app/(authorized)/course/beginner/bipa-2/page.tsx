import CourseCard from "../../_components/course-card";
import { getCoursesByLevel } from "@/core/services/course.service";

export const metadata = {
  title: 'Beginner BIPA 2 Courses | Belajar Indo',
}

export default async function Page() {
  const res = await getCoursesByLevel({ bipa: 'bipa-2', query: '' })
  const { data, rowCount } = res

  return (
    <div className="grid auto-rows-min gap-4">
      <CourseCard type="bipa_2" data={data ?? []} />
    </div>
  )
}