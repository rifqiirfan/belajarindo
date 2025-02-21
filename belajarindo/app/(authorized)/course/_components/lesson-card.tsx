"use client"

import { Card, CardContent } from "@/components/ui/card"
import { IPassedBipa, LabelEnum, replaceUnderscore } from "./types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { createProgressUser } from "@/core/services/user-progress.service";

/** Status are NST: Not Started, INP: In Progress, FNS: Finish */
function statusLesson(status: string) {
  switch (status) {
    case 'INP':
      return 'border-primary'
    case 'FNS':
      return 'border-green-500'
    default:
      return 'border-input'
  }
}

async function updateStatusLesson({lesson_id, status}: {lesson_id: string, status: string}) {
  if (status == 'NST') {
    await createProgressUser({data: {
      lesson_id: lesson_id
    }})
  } 
}

export default function LessonCard({ type, course, data }: { type: IPassedBipa, course: any, data: any[] }) {
  const label = LabelEnum[type] ?? ''
  return (
    <>
      {data.map((d, index) => (
        <Link key={index} href={`/course/${label}/${replaceUnderscore(type)}/${course?.id ?? 0}/lesson/${d?.id ?? 0}`}>
          <Card className={cn("w-full max-w-5xl overflow-hidden border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer",
            statusLesson(d.status),
          )}
          onClick={async () => await updateStatusLesson({lesson_id: d.id, status: d.status})}
          >
            <CardContent className="text-sm p-3">
              Lesson {d?.lesson_order}: <span className="font-medium">{d?.name ?? ''}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  )
}