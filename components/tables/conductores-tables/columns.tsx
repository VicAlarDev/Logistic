"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Conductor } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { CellAction } from "./cell-action";

export const columns: ColumnDef<Conductor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nombre",
    header: "NOMBRE",
  },
  {
    accessorKey: "apellido",
    header: "APELLIDO",
  },
  {
    accessorKey: "cedula",
    header: "CEDULA",
  },
  {
    accessorKey: "telefono",
    header: "TELEFONO",
  },
  {
    id: "acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
