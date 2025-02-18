import { Metadata } from "next";
import FormLessons from "../_components/form";

export const metadata: Metadata = {
  title: "Create Course",
  description: "Master Data Course Create",
};

export default async function Page() {
  return (
    <>
      <h4 className="text-lg font-semibold">Create Course</h4>
      <FormLessons type={"create"} />
    </>
  )
}