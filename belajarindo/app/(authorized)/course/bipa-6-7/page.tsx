import { Badge } from "@/components/ui/badge"
import Image from "next/image";

export const metadata = {
  title: 'Advanced BIPA 6-7 Courses | Belajar Indo',
}

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-8 p-8">
      <div className="grid auto-rows-min gap-8 md:grid-cols-1">
        <div className="flex flex-1 flex-col sm:flex-row overflow-hidden auto-rows-min bg-white rounded-lg shadow-md">
          <div className="sm:w-1/3">
            <Image
              src={"/advanced_bipa-6-7_card.png"}
              alt={"Advanced BIPA 6 and BIPA 7"}
              width={480}
              height={276}
              className="w-full h-48 sm:h-full object-cover"
            />
          </div>
          <div className="sm:w-2/3 p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Modern Indonesian Literature (1920-1945)</h2>
            <Badge className="bg-pink-200">Advanced</Badge>
            <p className="text-gray-600">Type the description here</p>
          </div>
        </div>
      </div>
    </div>
  )
}