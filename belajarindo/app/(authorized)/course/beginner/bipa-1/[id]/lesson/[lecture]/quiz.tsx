'use client'

import { Button } from '@/components/ui/button';
import { CsxModalBase } from '@/components/composite/modal';
import { useState } from 'react';
import { QuizzesDataTypes, QuizzesRelationDataTypes } from '@/core/models/quiz.model';
import QuizzesList from '@/app/(authorized)/course/_components/quiz-list';
import Link from 'next/link';
import { IPassedBipa, LabelEnum, replaceUnderscore } from '@/app/(authorized)/course/_components/types';

const questions: QuizzesDataTypes[] = [
  {
    question_text: "What 'Morning' means in indonesia?",
    lesson_id: 1,
    correct_answer: "option_1",
    option_1: "Pagi",
    option_2: "Siang",
    option_3: "Sore",
    option_4: "Malam",
    id: 0,
    question_type: '',
    created_at: '',
    updated_at: ''
  },
]

export default function QuizLesson({ type, course_id, quizzes }: { type: IPassedBipa, course_id: string, quizzes: QuizzesRelationDataTypes[] }) {
  const label = LabelEnum[type] ?? ''
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className='flex gap-2'>
        <Button onClick={() => setOpen(!open)} className='max-w-lg' variant={'default'}>Finish Lesson</Button>
        <Button className='max-w-lg' variant={'outline'} asChild>
          <Link href={`/course/${label}/${replaceUnderscore(type)}/${course_id}`}>
            Back to Lessons
          </Link>
        </Button>
      </div>
      <CsxModalBase open={open} setOpen={setOpen} title={'Quiz'} className="flex flex-1 flex-col min-w-[768px]">
        <QuizzesList questions={quizzes} />
      </CsxModalBase>
    </>
  )
}