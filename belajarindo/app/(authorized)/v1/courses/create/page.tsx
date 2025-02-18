import { Metadata } from "next";
import FormLessons from "../_components/form";

export const metadata: Metadata = {
  title: "Create Lesson",
  description: "Master Data Lesson Create",
};

export default async function Page() {
  return (
    <>
      <h4 className="text-lg font-semibold">Create Lesson</h4>
      <FormLessons type={"create"} />
    </>
  )
}