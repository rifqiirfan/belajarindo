"use client"

import { ColumnDef } from "@tanstack/react-table";
import { deleteQuiz } from "@/core/services/quiz.service";
import { generateSortableColumn } from "@/components/composite/datatable/sorting";
import { SimpleAction } from "@/components/composite/datatable/misc";
import { QuizzesDataTypes } from "@/core/models/quiz.model";

export const columns: ColumnDef<QuizzesDataTypes>[] = [
  generateSortableColumn("course_name"),
  generateSortableColumn("lesson_name"),
  generateSortableColumn("question_text"),
  // generateSortableColumn("correct_answer"),
  // generateSortableColumn("option_1"),
  // generateSortableColumn("option_2"),
  // generateSortableColumn("option_3"),
  // generateSortableColumn("option_4"),
  {
    id: "action",
    header: "Action",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <SimpleAction
        detailUrl={`/v1/quizzes/${row.original.id}`}
        editUrl={`/v1/quizzes/${row.original.id}/edit`}
        onDelete={() => deleteQuiz({ id: String(row.original.id) })}
      />
    ),
  }
]