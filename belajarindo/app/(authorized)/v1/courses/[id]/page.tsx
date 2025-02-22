import { Metadata } from "next";
import { notFound } from "next/navigation";
import FormLessons from "../_components/form";
import { getAchievementById } from "@/core/services/achievement.service";
import { getCourseById } from "@/core/services/course.service";

export const metadata: Metadata = {
  title: "Detail Course",
  description: "Master Data Course Detail",
};

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const res = await getCourseById({ id })

  return (
    <>
      <h4 className="text-lg font-semibold">Detail Course</h4>
      <FormLessons data={res.data} type={"detail"} />
    </>
  )
}