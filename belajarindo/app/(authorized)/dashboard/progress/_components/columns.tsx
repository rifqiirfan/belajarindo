"use client"

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { deleteAchievement } from "@/core/services/achievement.service";
import { generateSortableColumn } from "@/components/composite/datatable/sorting";
import { SimpleAction } from "@/components/composite/datatable/misc";
import { AchievementsDataTypes } from "@/core/models/achievement.model";
import { Progress } from "@/components/ui/progress";

const columnHelper = createColumnHelper<any>()

export const columns: ColumnDef<any>[] = [
  columnHelper.accessor('course_name', {
    cell: info => info.getValue(),
    header: () => 'Course',
  }),
  columnHelper.accessor('level', {
    cell: info => <span className="uppercase">{info.getValue() ? String(info.getValue()) : '-'}</span>,

    header: () => 'Level',
  }),
  columnHelper.accessor('lesson_name', {
    cell: info => info.getValue(),
    header: () => 'Lesson',
  }),
  columnHelper.accessor('date_enrolled', {
    cell: info => info.getValue(),
    header: () => 'Date Enrolled',
  }),
  columnHelper.accessor('progress', {
    cell: info => <Progress value={info.getValue() ? Number(info.renderValue()) : 0} />,
    header: () => 'Progress',
  }),
]