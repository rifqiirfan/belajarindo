import { getCoursesByLevel } from "@/core/services/course.service";
import CourseCard from "../../_components/course-card";

export const metadata = {
  title: 'Intermediate BIPA 4 Courses | Belajar Indo',
}

export default async function Page() {
  const res = await getCoursesByLevel({ bipa: 'bipa-4', query: '' })
  const { data, rowCount } = res

  return (
    <div className="grid auto-rows-min gap-4">
      <CourseCard type="bipa_4" data={data ?? []} />
    </div>
  )
}