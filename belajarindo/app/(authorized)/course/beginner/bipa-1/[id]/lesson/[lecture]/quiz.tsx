'use client'

import { Button } from '@/components/ui/button';
import { CsxModalBase } from '@/components/composite/modal';
import { useState } from 'react';
import { QuizzesDataTypes, QuizzesRelationDataTypes } from '@/core/models/quiz.model';
import QuizzesList from '@/app/(authorized)/course/_components/quiz-list';

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
  // {
  //   question_text: "Which planet is known as the Red Planet?",
  //   lesson_id: 2,
  //   correct_answer: "option_3",
  //   option_1: "Venus",
  //   option_2: "Jupiter",
  //   option_3: "Mars",
  //   option_4: "Saturn",
  //   id: 0,
  //   question_type: '',
  //   created_at: '',
  //   updated_at: ''
  // },
  // {
  //   question_text: "What is the largest mammal in the world?",
  //   lesson_id: 3,
  //   correct_answer: "option_2",
  //   option_1: "African Elephant",
  //   option_2: "Blue Whale",
  //   option_3: "Giraffe",
  //   option_4: "Hippopotamus",
  //   id: 0,
  //   question_type: '',
  //   created_at: '',
  //   updated_at: ''
  // },
]

export default function QuizLesson({ quizzes }: { quizzes: QuizzesRelationDataTypes[] }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(!open)} className='max-w-40' variant={'default'}>Finish Lesson</Button>
      <CsxModalBase open={open} setOpen={setOpen} title={'Quiz'} className="flex flex-1 flex-col min-w-[768px]">
        <QuizzesList questions={questions} />
      </CsxModalBase>
    </>
  )
}