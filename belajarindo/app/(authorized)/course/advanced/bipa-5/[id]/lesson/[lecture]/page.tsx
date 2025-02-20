import Image from 'next/image';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import QuizLesson from './quiz';
import { getQuizzesOneByLesson } from '@/core/services/quiz.service';
import { getLessonById } from '@/core/services/lesson.service';

export const metadata = {
  title: 'BIPA 5 Course Lessons | Belajar Indo',
}

export default async function Page({ params }: { params: { id: string, lecture: string } }) {
  const { id, lecture } = await params
  const [lesson, quiz] = await Promise.all([getLessonById({id}), getQuizzesOneByLesson({ lesson_id: lecture }) as any])

  const { data } = lesson;
  return (
    <div className="flex flex-1 flex-col gap-8 p-12">
      <div className="grid auto-rows-min gap-8 md:grid-cols-1">
        <h1 className="text-4xl font-bold">Introduction</h1>
        <p className="text-muted-foreground font-medium">This lesson will help you to introduce yourself to Indonesian people.</p>

        <Image
          src="/resume-genius-wNC266LJamg-unsplash.jpg"
          width={960}
          height={640}
          alt="Belajar Indo logo"
        />
        <p className='text-muted-foreground'><em>Photo by <a href="https://unsplash.com/@resumegenius?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Resume Genius</a> on <a href="https://unsplash.com/photos/a-woman-shaking-hands-with-another-woman-at-a-table-wNC266LJamg?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></em></p>

        <p>Here are some expressions you need to know when introducing yourself.</p>
        <Table>
          <TableCaption>A list of introduction expressions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Expressions</TableHead>
              <TableHead>Meaning</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Selamat <b>pagi</b></TableCell>
              <TableCell>Good morning</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Selamat <b>siang</b></TableCell>
              <TableCell>Good afternoon</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Selamat <b>sore</b></TableCell>
              <TableCell>Good evening</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Selamat <b>malam</b></TableCell>
              <TableCell>Good evening</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Selamat tidur</TableCell>
              <TableCell>Good night</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <p>Most Indonesians prefer to say &quot;<em>Selamat siang</em>&quot; from 10 a.m. to 2 p.m., while &quot;<em>Selamat sore</em>&quot; is from 3 p.m. until sunset. After sunset, we can use &quot;<em>Selamat malam</em>&quot; until midnight.</p>
      </div>

      <QuizLesson type={'bipa_5'} course_id={id} quizzes={quiz?.data} />
    </div>
  )
}