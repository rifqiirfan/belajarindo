// import { Large } from "@/components/typography";
// import Form from "@/app/(authorized)/v1/asset/customers/_components/form";
import { Metadata } from "next";
import FormAchievement from "../_components/form";

export const metadata: Metadata = {
  title: "Create Customer",
  description: "Master Data Customer Create",
};

export default async function Page() {
  return (
    <>
      <h4 className="text-lg font-semibold">Create Achievement</h4>
      <FormAchievement type={"create"} />
    </>
  )
}