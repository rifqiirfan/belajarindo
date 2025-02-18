"use client"

import { ColumnDef } from "@tanstack/react-table";
import { deleteAchievement } from "@/core/services/achievement.service";
import { generateSortableColumn } from "@/components/composite/datatable/sorting";
import { SimpleAction } from "@/components/composite/datatable/misc";
import { AchievementsDataTypes } from "@/core/models/achievement.model";

export const columns: ColumnDef<AchievementsDataTypes>[] = [
  generateSortableColumn("name"),
  generateSortableColumn("description"),
  generateSortableColumn("icon_url"),
  {
    id: "action",
    header: "Action",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <SimpleAction
        detailUrl={`/v1/achievements/${row.original.id}`}
        editUrl={`/v1/achievements/${row.original.id}/edit`}
        onDelete={() => deleteAchievement({ id: String(row.original.id) })}
      />
    ),
  }
]