"use client"

import { ColumnDef } from "@tanstack/react-table";
import { deleteUser } from "@/core/services/user.service";
import { generateSortableColumn } from "@/components/composite/datatable/sorting";
import { SimpleAction } from "@/components/composite/datatable/misc";
import { UsersDataTypes } from "@/core/models/user.model";

export const columns: ColumnDef<UsersDataTypes>[] = [
  generateSortableColumn("username"),
  generateSortableColumn("role"),
  generateSortableColumn("email"),
  generateSortableColumn("join_date"),
  generateSortableColumn("level"),
  generateSortableColumn("experience_point"),
  {
    id: "action",
    header: "Action",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => (
      <SimpleAction
        detailUrl={`/v1/users/${row.original.id}`}
        editUrl={`/v1/users/${row.original.id}/edit`}
        onDelete={() => deleteUser({ id: row.original.id })}
      />
    ),
  }
]