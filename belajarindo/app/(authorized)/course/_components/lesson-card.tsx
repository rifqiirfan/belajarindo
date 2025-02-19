import { Card, CardContent } from "@/components/ui/card"

function replaceUnderscore(str: string) {
  return str.replace(/_/g, '-');
}

export default function LessonCard({ data }: { data: any[] }) {
  return (
    <>
      {data.map((d, index) => (
        <Card key={index} className="w-full max-w-5xl overflow-hidden border border-input bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer">
          <CardContent className="text-sm p-3">
            Lesson {d?.lesson_order}: <span className="font-medium">{d?.name ?? ''}</span>
          </CardContent>
        </Card>
      ))}
    </>
  )
}