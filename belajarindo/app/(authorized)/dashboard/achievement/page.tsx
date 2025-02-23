import { getLessonsDashboard } from "@/core/services/lesson.service";
import AchievementCard from "./achievement-card";

export const metadata = {
  title: 'Achievement | Belajar Indo',
}

export default async function AchievementPage() {
  const res = await getLessonsDashboard({});
  const { data } = res;

  console.log({data})
  const achievements = [
    {
      name: 'Beginner',
      bipa: 'BIPA 1 and BIPA 2',
      color: 'green',
      total_enrolled: data?.beginner?.enrolled ?? 0,
      progress: data?.beginner?.progress ?? 0,
      achievement: data?.beginner?.achivement ?? []
    },
    {
      name: 'Intermediate',
      bipa: 'BIPA 3 and BIPA 4',
      color: 'cyan',
      total_enrolled: data?.intermediate?.enrolled ?? 0,
      progress: data?.intermediate?.progress ?? 0,
      achievement: data?.intermediate?.achivement ?? []
    },
    {
      name: 'Advanced',
      bipa: 'BIPA 5, BIPA6, and BIPA 7',
      color: 'pink',
      total_enrolled: data?.advanced?.enrolled ?? 0,
      progress: data?.advanced?.progress ?? 0,
      achievement: data?.advanced?.achivement ?? []
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {achievements.map((achieve, index) => (
        <AchievementCard key={index} achievement={achieve} />
      ))}
    </div>
  )
}