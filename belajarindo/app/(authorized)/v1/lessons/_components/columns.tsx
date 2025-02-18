"use client"

import { ColumnDef } from "@tanstack/react-table";
import { deleteLesson } from "@/core/services/lesson.service";
import { generateSortableColumn } from "@/components/composite/datatable/sorting";
import { SimpleAction } from "@/components/composite/datatable/misc";
import { LessonsDataTypes } from "@/core/models/lesson.model";

export const columns: ColumnDef<LessonsDataTypes>[] = [
  generateSortableColumn("course_id"),
  generateSortableColumn("title"),
  generateSortableColumn("content"),
  generateSortableColumn("lesson_order"),
  {
    id: "action",
    header: "Action",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <SimpleAction
        detailUrl={`/v1/lessons/${row.original.id}`}
        editUrl={`/v1/lessons/${row.original.id}/edit`}
        onDelete={() => deleteLesson({ id: row.original.id })}
      />
    ),
  }
]