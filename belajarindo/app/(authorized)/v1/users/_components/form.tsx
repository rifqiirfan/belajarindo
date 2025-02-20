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
import { getCourses } from "@/core/services/course.service";
import { sParamComboboxGeneral } from "@/core/utilities/zodUtils";
import { UsersDataTypes, zUsers } from "@/core/models/user.model";
import { createUser, updateUser } from "@/core/services/user.service";
import { getLessons } from "@/core/services/lesson.service";

export default function FormUsers({ data, type }: FormPageProps) {
  const [, setLoading] = useLoading()

  const form = useForm<UsersDataTypes>({
    resolver: zodResolver(zUsers.FORM),
    ...(data ? { defaultValues: data } : {})
  })

  const onSubmit = async (data: UsersDataTypes) => {
    try {
      setLoading(true)
      if (type === "create") {
        const res = await createUser({ data })
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
        const res = await updateUser(newData)
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

            <InputBasic name={"full_name"} required={true} disabled={type === "detail"} />
            <InputBasic name={"email"} required={true} disabled={type === "detail"} />
            <InputBasic name={"username"} required={true} disabled={type === "detail"} />
            <InputBasic name={"password"} required={true} disabled={type === "detail"} />
            <DatePickerBasic name={"join_date"} required={true} disabled={type === "detail"} label={'Join Date'} />
            <InputSelect
              name={"role"}
              required={true}
              disabled={type === "detail"}
              label="Role"
              options={[
                { label: 'user', value: 'user' },
                { label: 'admin', value: 'admin' },
              ]}
            />
            <InputBasic name={"experience_points"} defaultValue={100} required={true} disabled={type === "detail"} />
            <DatePickerBasic name={"date_of_birth"} required={true} disabled={type === "detail"} label={'Date of Birth'} />
            <InputBasic name={"country"} required={true} disabled={type === "detail"} />
            <div className="flex gap-2">
              {type !== "detail" && <Button type="submit">Submit</Button>}
              <Button type="button" variant={'outline'} asChild><Link href={'/v1/users'}>Back</Link></Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}