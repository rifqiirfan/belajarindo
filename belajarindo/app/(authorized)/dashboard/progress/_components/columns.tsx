"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { deleteAchievement } from "@/core/services/achievement.service";
import { generateSortableColumn } from "@/components/composite/datatable/sorting";
import { SimpleAction } from "@/components/composite/datatable/misc";
import { AchievementsDataTypes } from "@/core/models/achievement.model";

const columnHelper = createColumnHelper<any>()

export const columns: ColumnDef<any>[] = [
  columnHelper.accessor('course', {
    cell: info => info.getValue(),
    header: () => 'Course',
  }),
  columnHelper.accessor('level', {
    cell: info => info.getValue(),
    header: () => 'Level',
  }),
  columnHelper.accessor('lesson', {
    cell: info => info.getValue(),
    header: () => 'Lesson',
  }),
  columnHelper.accessor('date_enrolled', {
    cell: info => info.getValue(),
    header: () => 'Date Enrolled',
  }),
  columnHelper.accessor('progress', {
    cell: info => info.getValue(),
    header: () => 'Progress',
  }),
]