"use client"

import { ColumnDef } from "@tanstack/react-table";
import { generateSortableColumn } from "@/components/composite/datatable/sorting";
import { SimpleAction } from "@/components/composite/datatable/misc";
import { CoursesRelationDataTypes } from "@/core/models/course.model";
import { deleteCourse } from "@/core/services/course.service";

export const columns: ColumnDef<CoursesRelationDataTypes>[] = [
  generateSortableColumn("name"),
  generateSortableColumn("description"),
  generateSortableColumn("difficulty_level"),
  generateSortableColumn("total_lessons"),
  {
    id: "action",
    header: "Action",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <SimpleAction
        detailUrl={`/v1/courses/${row.original.id}`}
        editUrl={`/v1/courses/${row.original.id}/edit`}
        onDelete={() => deleteCourse({ id: String(row.original.id) })}
      />
    ),
  }
]