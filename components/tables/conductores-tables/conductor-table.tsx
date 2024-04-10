"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useFetchData } from "@/hooks/useFetch";
import type { Conductor } from "@prisma/client";

type ConductorResponse = {
  conductores: Conductor[];
};

export const ConductorTabla: React.FC = () => {
  const router = useRouter();

  const { data, isLoading } = useFetchData<ConductorResponse>(
    "http://localhost:3000/api/conductores",
    ["conductores"],
  );

  const conductores = data?.conductores;

  if (isLoading) return <div>Cargando...</div>;

  if (!data) return <div>No hay conductores</div>;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Conductores (${data.conductores.length})`}
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
