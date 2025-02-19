import {Metadata} from "next";
import {notFound} from "next/navigation";
import FormLessons from "../../_components/form";
import { getAchievementById } from "@/core/services/achievement.service";
import { getCourseById } from "@/core/services/course.service";

export const metadata: Metadata = {
  title: "Edit Course",
  description: "Master Data Course Edit",
};

export default async function Page({params}: { params: { id: string } }) {
  const {id} = await params

  const res = await getCourseById({id})

  return (
    <>
      <h4 className="text-lg font-semibold">Edit Course</h4>
      <FormLessons data={res.data} type={"update"} />
    </>
  )
}