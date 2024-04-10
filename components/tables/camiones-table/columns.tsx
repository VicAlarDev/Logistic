"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CellAction } from "./cell-action";
import type { Vehiculo } from "./ICamion";

export const columns: ColumnDef<Vehiculo>[] = [
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
    accessorKey: "placa",
    header: "PLACA",
  },
  {
    accessorKey: "modelo",
    header: "MODELO",
  },
  {
    accessorKey: "marca",
    header: "MARCA",
    enableSorting: true,
  },
  {
    accessorKey: "peso",
    header: "PESO MAX KG",
  },
  {
    accessorFn: (row) => `${row.chofer.nombre} ${row.chofer.apellido}`,
    header: "CONDUCTOR",
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "acciones",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
