"use client"

import { DatePickerBasic, InputBasic, InputCombobox, InputSelect, TextareaBasic } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLoading } from "@/components/providers/fullscreen-loading";
import { Card, CardContent } from "@/components/ui/card";
import { FormPageProps } from "@/core/types/pages";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { createCourse, updateCourse } from "@/core/services/course.service";
import { sParamComboboxGeneral } from "@/core/utilities/zodUtils";
import { CoursesDataTypes, zCourses } from "@/core/models/course.model";

export default function FormLessons({ data, type }: FormPageProps) {
  const [, setLoading] = useLoading()

  const form = useForm<CoursesDataTypes>({
    resolver: zodResolver(zCourses.FORM),
    ...(data ? { defaultValues: data } : {})
  })

  const onSubmit = async (formData: CoursesDataTypes) => {
    try {
      setLoading(true)
      if (type === "create") {
        // formData.creation_date = new Date().toISOString();
        const res = await createCourse({ data: formData })
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
        const res = await updateCourse({data: newData})
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

  const optionsLevel = [
    {label: 'Bipa 1', value: 'bipa-1'},
    {label: 'Bipa 2', value: 'bipa-2'},
    {label: 'Bipa 3', value: 'bipa-3'},
    {label: 'Bipa 4', value: 'bipa-4'},
    {label: 'Bipa 5', value: 'bipa-5'},
    {label: 'Bipa 6', value: 'bipa-6'},
    {label: 'Bipa 7', value: 'bipa-7'},
  ]

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputBasic name={"name"} required={true} disabled={type === "detail"} />
            <TextareaBasic name={"description"} required={true} disabled={type === "detail"} />
            <InputSelect
              name={"difficulty_level"}
              required={true}
              disabled={type === "detail"}
              label="Level"
              options={optionsLevel}
            />
            <DatePickerBasic name={"creation_date"} required={true} disabled={type === "detail"} label={'Creation Date'} />
            <div className="flex gap-2">
              {type !== "detail" && <Button type="submit">Submit</Button>}
              <Button type="button" variant={'outline'} asChild><Link href={'/v1/courses'}>Back</Link></Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}