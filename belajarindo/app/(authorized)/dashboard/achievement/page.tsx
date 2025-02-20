import { getLessonsDashboard } from "@/core/services/lesson.service";
import AchievementCard from "./achievement-card";

export const metadata = {
  title: 'Achievement | Belajar Indo',
}

export default async function AchievementPage() {
  const res = await getLessonsDashboard({});
  const { data } = res;
  console.log({res})

  const achievements = [
    {
      name: 'Beginner',
      bipa: 'BIPA 1 and BIPA 2',
      color: 'green',
      total_enrolled: data?.beginner ?? 0,
      progress: 10,
      achievement: 10
    },
    {
      name: 'Intermediate',
      bipa: 'BIPA 3 and BIPA 4',
      color: 'cyan',
      total_enrolled: data?.intermediate ?? 0,
      progress: 10,
      achievement: 10
    },
    {
      name: 'Advanced',
      bipa: 'BIPA 5, BIPA6, and BIPA 7',
      color: 'pink',
      total_enrolled: data?.advanced ?? 0,
      progress: 10,
      achievement: 10
    }
  ]

  return (
    <div className="grid auto-rows-min gap-8 md:grid-cols-3">
      {achievements.map((achieve, index) => (
        <AchievementCard key={index} achievement={achieve} />
      ))}
    </div>
  )
}