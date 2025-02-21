import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { BipaEnum, IPassedBipa, LabelEnum, replaceUnderscore } from "./types"

export default function CourseCard({ type, data }: { type: IPassedBipa, data: any[] }) {
  const bipa = BipaEnum[type] ?? 'undefined'
  const label = LabelEnum[type] ?? ''

  return (
    <>
      {data.map((d, index) => (
        <Card key={index} className="w-full max-w-5xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr]">
            <div className="relative aspect-[4/3] md:aspect-auto">
              <Image src={bipa} alt="BIPA Background"
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                fill
                priority
              />
            </div>

            <div className="p-4 md:p-6 bg-white">
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold mb-3">{d.name ?? ''}</h3>
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200 transition-colors ring-1 ring-slate-200 text-xs cursor-default capitalize">
                  {label}
                </Badge>
                <div className="pb-1 space-y-3">
                  <p className="text-[13px] text-muted-foreground mb-2">
                    {d?.description == '-' ? '' : '-'}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">
                    Creation: {d?.creation_date ?? format(new Date(), 'dd MMM yyyy')}
                  </p>
                </div>
                <Button size={'sm'} className="text-[13px]" variant={'default'} asChild>
                  <Link href={`/course/${label}/${replaceUnderscore(type)}/${d?.id ?? 0}`}>
                    Start Course
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}