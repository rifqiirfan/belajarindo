"use client"

import { ColumnDef } from "@tanstack/react-table";
import { deleteAchievement } from "@/core/services/achievement.service";
import { generateSortableColumn } from "@/components/composite/datatable/sorting";
import { SimpleAction } from "@/components/composite/datatable/misc";
import { AchievementsDataTypes } from "@/core/models/achievement.model";

export const columns: ColumnDef<AchievementsDataTypes>[] = [
  generateSortableColumn("name"),
  generateSortableColumn("description"),
  generateSortableColumn("address"),
  generateSortableColumn("contact_person", ""),
  generateSortableColumn("contact_email", "Contact Email"),
  generateSortableColumn("phone_number", "Phone Number"),
  {
    id: "action",
    header: "Action",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <SimpleAction
        detailUrl={`/v1/asset/customers/${row.original.id}`}
        editUrl={`/v1/asset/customers/${row.original.id}/edit`}
        onDelete={() => deleteAchievement({ id: row.original.id })}
      />
    ),
  }
]