"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import type { Conductor } from "@prisma/client";
import { useFetchConductores } from "@/hooks/query";

type ConductorResponse = {
  conductores: Conductor[];
};

export const ConductorTabla: React.FC = () => {
  const router = useRouter();

  const { data: conductores, isLoading } = useFetchConductores();

  if (isLoading) return <div>Cargando...</div>;

  if (!conductores) return <div>No hay conductores</div>;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Conductores (${conductores.length})`}
          description="Crea, modifica y elimina conductores."
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/conductor/nuevo`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Crear nuevo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="nombre" columns={columns} data={conductores} />
    </>
  );
};
