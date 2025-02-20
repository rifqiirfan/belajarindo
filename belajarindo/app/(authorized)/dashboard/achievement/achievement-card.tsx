import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleX } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export default function AchievementCard({achievement}: {achievement: any}) {
  return (
    <Card className={`bg-${achievement.color}-400 border border-slate-300`}>
      <CardHeader>
        <CardTitle>{achievement.name}</CardTitle>
        <CardDescription className={`text-${achievement.color}-950`}>{achievement.bipa}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-3xl">{achievement.total_enrolled}</p>
        <p className={`text-${achievement.color}-950`}>Enrolled lesson(s)</p>
      </CardContent>
      <CardContent>
        <div className="flex items-center gap-2">
          <span>Progress:</span>
          <Progress value={achievement.progress} />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <span>Achievement:</span>
          <CircleX />
        </div>
      </CardFooter>
    </Card>
  )
}