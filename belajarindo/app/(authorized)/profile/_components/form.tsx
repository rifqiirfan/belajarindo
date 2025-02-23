"use client"

import {InputBasic} from "@/components/inputs";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useLoading} from "@/components/providers/fullscreen-loading";
import {Card, CardContent} from "@/components/ui/card";
import {FormPageProps} from "@/core/types/pages";
import {Form} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {updateUser} from "@/core/services/user.service";
import {z} from "zod";
import {format} from "date-fns";
import {enUS} from "date-fns/locale";

const profileSchema = z.object({
  full_name: z.string({
    required_error: "Full Name is required",
    invalid_type_error: "Full Name is required"
  }).nonempty("Full Name is required"),
  username: z.string({
    required_error: "Username is required",
    invalid_type_error: "Username is required"
  }).nonempty("Username is required"),
  email: z.string({
    required_error: "Email is required",
    invalid_type_error: "Email is required"
  }).email("Email is invalid"),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password is required"
  }).nonempty("Password is required"),
  confirm_password: z.string({
    required_error: "Confirm Password is required",
    invalid_type_error: "Confirm Password is required"
  }).nonempty("Confirm Password is required"),
}).refine(({password, confirm_password}) => password === confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
})

export default function FormProfile({data}: Omit<FormPageProps, "type">) {
  const [, setLoading] = useLoading()

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    ...(data ? {defaultValues: data} : {})
  })

  const onSubmit = async (formData: z.infer<typeof profileSchema>) => {
    try {
      setLoading(true)
      const newData = {
        ...data,
        ...formData,
        id: data?.id.toString(),
        join_date: format(data?.join_date, "yyyy-MM-dd", { locale: enUS }),
        date_of_birth: format(data?.date_of_birth, "yyyy-MM-dd", { locale: enUS })
      }
      const res = await updateUser({data: newData})
      if (!res.success) {
        toast.error(`Update Failed. ${res.error}`)
        return
      }
      toast.success(`Update Success`)
    } catch (e: any) {
      toast.error(`Update Failed. ${e?.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputBasic name={"full_name"} required={true} disabled/>
            <InputBasic name={"email"} required={true} disabled/>
            <InputBasic name={"username"} required={true} disabled/>
            <InputBasic inputProps={{type: "password"}} name={"password"} required={true}/>
            <InputBasic inputProps={{type: "password"}} name={"confirm_password"} required={true}/>
            <div className="flex gap-2">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}