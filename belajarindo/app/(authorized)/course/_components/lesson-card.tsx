import { Card, CardContent } from "@/components/ui/card"
import { IPassedBipa, LabelEnum, replaceUnderscore } from "./types";
import Link from "next/link";

export default function LessonCard({ type, course, data }: { type: IPassedBipa, course: any, data: any[] }) {
  const label = LabelEnum[type] ?? ''

  return (
    <>
      {data.map((d, index) => (
        <Link key={index} href={`/course/${label}/${replaceUnderscore(type)}/${course?.id ?? 0}/lesson/${d?.id ?? 0}`}>
          <Card className="w-full max-w-5xl overflow-hidden border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer">
            <CardContent className="text-sm p-3">
              Lesson {d?.lesson_order}: <span className="font-medium">{d?.name ?? ''}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  )
}