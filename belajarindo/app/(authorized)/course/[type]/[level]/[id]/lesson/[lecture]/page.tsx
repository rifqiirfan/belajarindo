import QuizLesson from '../../../../../_components/quiz-container';
import { getQuizzesOneByLesson } from '@/core/services/quiz.service';
import { getLessonById } from '@/core/services/lesson.service';
import { InformationFinish } from '@/app/(authorized)/course/_components/alert-lessons';
import {IPassedBipa} from "@/app/(authorized)/course/_components/types";

type PageParams = Promise<{ type: string, level: string, id: string, lecture: string}>

export const generateMetadata = async ({params}: {params: PageParams}) => {
  const { type, level } = await params
  return {
    title: `${type} ${level} Courses | Belajar Indo`,
  }
}

export default async function Page({ params }: { params: PageParams}) {
  const { id, lecture, level } = await params
  const [lesson, quiz] = await Promise.all([getLessonById({id: lecture}) as any, getQuizzesOneByLesson({ lesson_id: lecture }) as any])

  const { data } = lesson;

  return (
    <div className="flex flex-1 flex-col gap-8 p-6">
      {lesson?.data?.status == 'FNS' && <InformationFinish /> }

      <div className={"prose max-w-none"} dangerouslySetInnerHTML={{ __html: data?.content ?? '' }} />
      <QuizLesson type={level.replace("-", "_") as IPassedBipa} course_id={id} lesson={lesson?.data} quizzes={quiz?.data} />
    </div>
  )
}