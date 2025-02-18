import {Metadata} from "next";
import {notFound} from "next/navigation";
import FormUsers from "../../_components/form";
import { getAchievementById } from "@/core/services/achievement.service";
import { getUserById } from "@/core/services/user.service";

export const metadata: Metadata = {
  title: "Edit User",
  description: "Master Data User Edit",
};

export default async function Page({params}: { params: { id: string } }) {
  const {id} = params

  const res = await getUserById({id})

  return (
    <>
      <h4 className="text-lg font-semibold">Edit User</h4>
      <FormUsers data={res.data} type={"update"} />
    </>
  )
}