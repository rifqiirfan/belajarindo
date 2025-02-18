"use client"

import { InputBasic, TextareaBasic } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLoading } from "@/components/providers/fullscreen-loading";
import { Card, CardContent } from "@/components/ui/card";
import { AchievementsDataTypes, zAchievements } from "@/core/models/achievement.model";
import { FormPageProps } from "@/core/types/pages";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAchievement, updateAchievement } from "@/core/services/achievement.service";
import Link from "next/link";

export default function FormAchievement({ data, type }: FormPageProps) {
  const [, setLoading] = useLoading()

  const form = useForm<AchievementsDataTypes>({
    resolver: zodResolver(zAchievements.FORM),
    ...(data ? { defaultValues: data } : {})
  })

  const onSubmit = async (data: AchievementsDataTypes) => {
    try {
      setLoading(true)
      if (type === "create") {
        const res = await createAchievement({ data })
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
        const res = await updateAchievement(newData)
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
            <InputBasic name={"name"} required={true} disabled={type === "detail"} />
            <TextareaBasic name={"description"} required={true} disabled={type === "detail"} />
            <InputBasic name={"icon_url"} required={true} disabled={type === "detail"} />
            <div className="flex gap-2">
              {type !== "detail" && <Button type="submit">Submit</Button>}
              <Button type="button" variant={'outline'} asChild><Link href={'/v1/achievements'}>Back</Link></Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}