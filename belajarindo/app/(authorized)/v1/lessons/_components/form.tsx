"use client"

import { InputBasic, InputCombobox, TextareaBasic } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLoading } from "@/components/providers/fullscreen-loading";
import { Card, CardContent } from "@/components/ui/card";
import { FormPageProps } from "@/core/types/pages";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { getCourses } from "@/core/services/course.service";
import { sParamComboboxGeneral } from "@/core/utilities/zodUtils";
import { LessonsDataTypes, zLessons } from "@/core/models/lesson.model";
import { createLesson, updateLesson } from "@/core/services/lesson.service";
import {cn, toCapitalizedWords} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import Editor from "@/components/strict/rich-text/editor";

export default function FormLessons({ data, type }: FormPageProps) {
  const [, setLoading] = useLoading()

  const form = useForm<LessonsDataTypes>({
    resolver: zodResolver(zLessons.FORM),
    ...(data ? { defaultValues: data } : {})
  })

  const onSubmit = async (formData: LessonsDataTypes) => {
    try {
      setLoading(true)
      if (type === "create") {
        const res = await createLesson({ data: formData })
        if (!res.success) {
          toast.error(`${type} Failed. ${res.error}`)
          return
        }
        form.reset()
      }
      if (type === "update") {
        const newData = {
          ...formData,
          id: data?.id ?? 0,
        }
        const res = await updateLesson({data: newData})
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
              name={"course_id"}
              required={true}
              disabled={type === "detail"}
              onSelect={async ({ option }) => { }}
              queryOptions={{
                queryKey: ["course_id"],
                queryFn: async ({ search, value }) => {
                  const query = sParamComboboxGeneral(search, "id,name");
                  const { data = [] } = await getCourses({ query });
                  return data.map((v) => ({
                    label: v.name,
                    value: String(v.id),
                  }));
                },
              }}
            />
            <InputBasic name={"name"} required={true} disabled={type === "detail"} />
            <TextareaBasic name={"content"} required={true} disabled={type === "detail"} />
            <FormField
              name={"content"}
              render={({field: {value, onChange}}) => (
                <FormItem>
                  <FormLabel className={cn("text-foreground", "required")}>Content</FormLabel>
                  <FormControl>
                    <Editor content={value} onChange={onChange} placeholder={"Enter Content"}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <InputBasic name={"audio_url"} required={true} disabled={type === "detail"} />
            <InputBasic name={"video_url"} required={true} disabled={type === "detail"} />
            <InputBasic name={"lesson_order"} required={true} disabled={type === "detail"} />

            <div className="flex gap-2">
              {type !== "detail" && <Button type="submit">Submit</Button>}
              <Button type="button" variant={'outline'} asChild><Link href={'/v1/lessons'}>Back</Link></Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}