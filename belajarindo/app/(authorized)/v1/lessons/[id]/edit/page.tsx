import {Metadata} from "next";
import {notFound} from "next/navigation";
import FormLessons from "../../_components/form";
import { getAchievementById } from "@/core/services/achievement.service";

export const metadata: Metadata = {
  title: "Edit Lesson",
  description: "Master Data Lesson Edit",
};

export default async function Page({params}: { params: { id: string } }) {
  const {id} = await params

  const res = await getAchievementById({id})

  return (
    <>
      <h4 className="text-lg font-semibold">Edit Lesson</h4>
      <FormLessons data={res.data} type={"update"} />
    </>
  )
}