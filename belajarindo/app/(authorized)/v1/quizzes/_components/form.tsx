"use client"

import { InputBasic, InputCombobox, TextareaBasic } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLoading } from "@/components/providers/fullscreen-loading";
import { Card, CardContent } from "@/components/ui/card";
import { FormPageProps } from "@/core/types/pages";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { getCourses } from "@/core/services/course.service";
import { sParamComboboxGeneral } from "@/core/utilities/zodUtils";
import { QuizzesDataTypes, zQuizzes } from "@/core/models/quiz.model";
import { createQuiz, updateQuiz } from "@/core/services/quiz.service";
import { getLessons } from "@/core/services/lesson.service";

export default function FormQuizzes({ data, type }: FormPageProps) {
  const [, setLoading] = useLoading()

  const form = useForm<QuizzesDataTypes>({
    resolver: zodResolver(zQuizzes.FORM),
    ...(data ? { defaultValues: data } : {})
  })

  const onSubmit = async (data: QuizzesDataTypes) => {
    try {
      setLoading(true)
      if (type === "create") {
        const res = await createQuiz({ data })
        if (!res.success) {
          toast.error(`${type} Failed. ${res.error}`)
          return
        }
        form.reset()
      }
      if (type === "update") {
        const newData = {
          id: data.id,
          data: data
        }
        const res = await updateQuiz(newData)
        if (!res.success) {
          toast.error(`${type} Failed. ${res.error}`)
          return
        }
      }
      toast.success(`${type} Success`)
    }
    catch (e: any) {
      toast.error(`${type} Failed. ${e?.message}`)
    }
    finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputCombobox
              name={"lesson_id"}
              required={true}
              disabled={type === "detail"}
              onSelect={async ({ option }) => { }}
              queryOptions={{
                queryKey: ["lesson_id"],
                queryFn: async ({ search }) => {
                  const query = sParamComboboxGeneral(search, "id,name");
                  const { data = [] } = await getLessons({ query });
                  return data.map((v) => ({
                    label: v.title,
                    value: v.id,
                  }));
                },
              }}
            />
            <TextareaBasic name={"question_text"} required={true} disabled={type === "detail"} />
            <InputBasic name={"correct_answer"} required={true} disabled={type === "detail"} />
            <InputBasic name={"option_1"} required={true} disabled={type === "detail"} />
            <InputBasic name={"option_2"} required={true} disabled={type === "detail"} />
            <InputBasic name={"option_3"} required={true} disabled={type === "detail"} />
            <InputBasic name={"option_4"} required={true} disabled={type === "detail"} />

            <div className="flex gap-2">
              {type !== "detail" && <Button type="submit">Submit</Button>}
              <Button type="button" variant={'outline'} asChild><Link href={'/v1/quizzes'}>Back</Link></Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}