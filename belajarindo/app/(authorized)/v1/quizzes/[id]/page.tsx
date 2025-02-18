import { Metadata } from "next";
import { notFound } from "next/navigation";
import FormQuizzes from "../_components/form";
import { getAchievementById } from "@/core/services/achievement.service";
import { getQuizById } from "@/core/services/quiz.service";

export const metadata: Metadata = {
  title: "Detail Quiz",
  description: "Master Data Quiz Detail",
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const res = await getQuizById({ id })

  return (
    <>
      <h4 className="text-lg font-semibold">Detail Quiz</h4>
      <FormQuizzes data={res.data} type={"detail"} />
    </>
  )
}