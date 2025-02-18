import { Metadata } from "next";
import FormUsers from "../_components/form";

export const metadata: Metadata = {
  title: "Create User",
  description: "Master Data User Create",
};

export default async function Page() {
  return (
    <>
      <h4 className="text-lg font-semibold">Create User</h4>
      <FormUsers type={"create"} />
    </>
  )
}