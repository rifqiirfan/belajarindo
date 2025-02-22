import { Metadata } from "next";
import FormLessons from "../_components/form";
import { getLessonById } from "@/core/services/lesson.service";

export const metadata: Metadata = {
  title: "Detail Lesson",
  description: "Master Data Lesson Detail",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const res = await getLessonById({ id })

  return (
    <>
      <h4 className="text-lg font-semibold">Detail Lesson</h4>
      <FormLessons data={res.data} type={"detail"} />
    </>
  )
}