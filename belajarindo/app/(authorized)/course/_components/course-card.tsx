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


    // <Card className="w-full max-w-4xl overflow-hidden">
    //   <div className="grid grid-cols-1 md:grid-cols-[2fr,3fr]">
    //     {/* Left side with gradient background */}
    //     <div className="relative min-h-[200px] md:min-h-[280px]">
    //       <Image
    //         src={"/beginner_bipa-1_card.png"}
    //         alt={"Beginner BIPA 1"}
    //         width={480}
    //         height={200}
    //         className="object-cover"
    //         sizes="(max-width: 768px) 100vw, 40vw"
    //         priority
    //       />
    //     </div>

    //     {/* Right side with content */}
    //     <div className="p-6 md:p-8 bg-white">
    //       <div className="space-y-6">
    //         <div className="space-y-4">
    //           <h3 className="text-2xl font-semibold tracking-tight">Introduction</h3>
    //           <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
    //             Beginner
    //           </Badge>
    //         </div>

    //         <p className="text-muted-foreground">
    //           Type the description here. This section can contain details about the lesson, its objectives, and what
    //           students will learn.
    //         </p>

    //         <Button className="bg-yellow-400 hover:bg-yellow-500 text-yellow-950">Start lesson</Button>
    //       </div>
    //     </div>
    //   </div>
    // </Card>
  )
}