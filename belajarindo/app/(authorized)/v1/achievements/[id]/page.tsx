import { Metadata } from "next";
import { notFound } from "next/navigation";
import FormAchievement from "../_components/form";
import { getAchievementById } from "@/core/services/achievement.service";

export const metadata: Metadata = {
  title: "Detail Customer",
  description: "Master Data Customer Detail",
};

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params

  const res = await getAchievementById({ id })

  return (
    <>
      <h4 className="text-lg font-semibold">Detail Achievement</h4>
      <FormAchievement data={res.data} type={"detail"} />
    </>
  )
}