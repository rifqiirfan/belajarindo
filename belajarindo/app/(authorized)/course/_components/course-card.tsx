import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"

type IPassedBipa = 'bipa_1' | 'bipa_2' | 'bipa_3' | 'bipa_4' | 'bipa_5' | 'bipa_6' | 'bipa_7'
enum BipaEnum {
  bipa_1 = '/beginner_bipa-1_card.png',
  bipa_2 = '/beginner_bipa-2_card.png',
  bipa_3 = '/intermediate_bipa-3_card.png',
  bipa_4 = '/intermediate_bipa-4_card.png',
  bipa_5 = '/advanced_bipa-5_card.png',
  bipa_6 = '/advanced_bipa-6-7_card.png',
  bipa_7 = '/advanced_bipa-6-7_card.png',
}

enum LabelEnum {
  bipa_1 = 'beginner',
  bipa_2 = 'beginner',
  bipa_3 = 'intermediate',
  bipa_4 = 'intermediate',
  bipa_5 = 'advanced',
  bipa_6 = 'advanced',
  bipa_7 = 'advanced',
}

function replaceUnderscore(str: string) {
  return str.replace(/_/g, '-');
}

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