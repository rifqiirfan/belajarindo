import { Metadata } from "next";
import FormQuizzes from "../_components/form";

export const metadata: Metadata = {
  title: "Create Quiz",
  description: "Master Data Quiz Create",
};

export default async function Page() {
  return (
    <>
      <h4 className="text-lg font-semibold">Create Quiz</h4>
      <FormQuizzes type={"create"} />
    </>
  )
}