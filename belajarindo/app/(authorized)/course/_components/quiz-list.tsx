"use client"

import { Key, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { QuizzesDataTypes } from "@/core/models/quiz.model"
import { updateProgressUser } from "@/core/services/user-progress.service"
import { useLoading } from "@/components/providers/fullscreen-loading"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const exampleQuestions: QuizzesDataTypes[] = [
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

interface QuizListProps {
  lesson: any,
  questions: QuizzesDataTypes[]
}

export default function QuizzesList({ lesson, questions }: QuizListProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const [, setLoading] = useLoading()

  const [achievement, setAchievement] = useState<any[]>([]);

  const handleSubmit = () => {
    const isCorrect = selectedAnswer === currentQuestion.correct_answer
    setIsSubmitted(true)
    setAnswers([...answers, isCorrect])
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setSelectedAnswer("")
    setIsSubmitted(false)
  }

  const handleReset = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer("")
    setIsSubmitted(false)
    setScore(0)
    setAnswers([])
  }

  const handleFinish = async () => {
    if (lesson?.status == 'NST' || lesson?.status == 'INP') {
      try {
        setLoading(true);
        const res = await updateProgressUser({
          data: {
            id: lesson?.progress_id,
            lesson_id: lesson?.id,
            quiz_id: questions[0].id
          }
        }) as any
        console.log({ res })
        if (!res.success) {
          toast.error(`Submit Quiz Failed. ${res.error}`)
          return
        }
        toast.success(`Submit Quiz Success. Lesson Finish.`)

        if (res?.data?.achievement) {

        }
      }
      catch (e: any) {
        toast.error(`Submit Quiz Failed. ${e?.message}`)
      }
      finally {
        setLoading(false);
      }
    }
  }

  const handleBackQuiz = async () => {
    setAchievement([])
  }

  if (achievement.length > 0) {
    return (
      <div className="flex-grow overflow-auto p-4">
        <h4 className="mb-3">Congrats! You Got New Achievement!</h4>
        {achievement?.map((d: any, index: Key) => (
          <div key={index} className="flex flex-col items-center space-y-2 p-0">
            {d?.icon_url && (
              <Avatar className="p-2">
                <AvatarImage src={d?.icon_url} alt="@shadcn" />
                <AvatarFallback>TROPY</AvatarFallback>
              </Avatar>
            )}
            <span className="text-sm font-medium text-center">{d.achievement_name}</span>
          </div>
        ))}
        <Button onClick={handleBackQuiz} variant={'outline'} className="mt-3 w-full">Back To Quiz</Button>
      </div>
    )
  }

  if (questions?.length == 0) {
    return <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-lg font-medium">Quiz is Not Available.</h2>
      </CardHeader>
      <CardContent>
        <p className="text-md">
          We currently work again this. Please wait a moment and try it again.
        </p>
      </CardContent>
    </Card>
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <h2 className="text-2xl font-bold">Quiz Complete! 🎉</h2>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-xl">
              Your score: {score} out of {questions.length}
            </p>
            <p className="text-lg text-muted-foreground">({Math.round((score / questions.length) * 100)}%)</p>
          </div>
        </CardContent>
        <CardFooter>
          {(score == questions.length) &&
            <Button onClick={lesson?.status != 'FNS' ? handleFinish : handleReset} className="w-full" variant={lesson?.status != 'FNS' ? 'default' : 'outline'}>
              {lesson?.status != 'FNS' ? 'Finish Lesson' : 'Restart Quiz'}
            </Button>
          }
          {(score != questions.length) &&
            <Button onClick={handleReset} variant={'outline'} className="w-full">Restart Quiz</Button>
          }
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="p-2">
      <div className="space-y-4">
        <Progress value={progress} className="w-full" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          {/* <span>Score: {score}</span> */}
        </div>
        <h2 className="text-2xl font-bold">{currentQuestion.question_text}</h2>
        {/* <p className="text-sm text-muted-foreground">Lesson ID: {currentQuestion.lesson_id}</p> */}
      </div>
      <div className="grid my-4">
        <RadioGroup
          value={selectedAnswer}
          onValueChange={setSelectedAnswer}
          className="space-y-3"
          disabled={isSubmitted}
        >
          {(["option_1", "option_2", "option_3", "option_4"] as const).map((optionKey, index) => {
            const isSelected = selectedAnswer === optionKey
            const isCorrectAnswer = currentQuestion.correct_answer === optionKey
            const showCorrect = isSubmitted && isCorrectAnswer
            const showIncorrect = isSubmitted && isSelected && !isCorrectAnswer

            return (
              <div
                key={optionKey}
                className={cn(
                  "flex items-center space-x-2 rounded-lg border p-4 transition-colors",
                  isSelected && !isSubmitted && "border-primary",
                  showCorrect && "border-green-500 bg-green-50 dark:bg-green-950",
                  showIncorrect && "border-red-500 bg-red-50 dark:bg-red-950",
                )}
              >
                <RadioGroupItem value={optionKey} id={`${currentQuestionIndex}-${optionKey}`} className="sr-only" />
                <Label
                  htmlFor={`${currentQuestionIndex}-${optionKey}`}
                  className="flex flex-1 items-center justify-between cursor-pointer"
                >
                  <span className="text-base">{currentQuestion[optionKey]}</span>
                  {showCorrect && (
                    <div className="rounded-full bg-green-500 p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                  )}
                  {showIncorrect && (
                    <div className="rounded-full bg-red-500 p-1">
                      <X className="h-4 w-4 text-white" />
                    </div>
                  )}
                </Label>
              </div>
            )
          })}
        </RadioGroup>
      </div>
      <div className="flex justify-between">
        {isSubmitted ? (
          <>
            <p
              className={cn(
                "text-sm font-medium",
                selectedAnswer === currentQuestion.correct_answer ? "text-green-500" : "text-red-500",
              )}
            >
              {selectedAnswer === currentQuestion.correct_answer ? "Correct answer! 🎉" : "Incorrect answer."}
            </p>
            <Button onClick={handleNext}>
              {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            </Button>
          </>
        ) : (
          <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full">
            Submit Answer
          </Button>
        )}
      </div>
    </div>
  )
}

