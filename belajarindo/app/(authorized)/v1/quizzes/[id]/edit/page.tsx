import {Metadata} from "next";
import {notFound} from "next/navigation";
import FormQuizzes from "../../_components/form";
import { getAchievementById } from "@/core/services/achievement.service";
import { getQuizById } from "@/core/services/quiz.service";

export const metadata: Metadata = {
  title: "Edit Quiz",
  description: "Master Data Quiz Edit",
};

export default async function Page({params}: { params: Promise<{ id: string }> }) {
  const {id} = await params

  const res = await getQuizById({id})

  return (
    <>
      <h4 className="text-lg font-semibold">Edit Quiz</h4>
      <FormQuizzes data={res.data} type={"update"} />
    </>
  )
}