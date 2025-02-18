import { Badge } from "@/components/ui/badge"
import Image from "next/image";

export const metadata = {
  title: 'Beginner BIPA 2 Courses | Belajar Indo',
}

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8">
      <div className="grid auto-rows-min gap-8 md:grid-cols-1">
        <div className="flex flex-1 flex-col sm:flex-row overflow-hidden auto-rows-min bg-white rounded-lg shadow-md">
          <div className="sm:w-1/3">
            <Image
              src={"/beginner_bipa-2_card.png"}
              alt={"Beginner BIPA 2"}
              width={480}
              height={276}
              className="w-full h-48 sm:h-full object-cover"
            />
          </div>
          <div className="sm:w-2/3 p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Comparative and Superlative</h2>
            <Badge className="bg-green-200">Beginner</Badge>
            <p className="text-gray-600 mt-2">Type the description here</p>
          </div>
        </div>
      </div>
    </div>
  )
}