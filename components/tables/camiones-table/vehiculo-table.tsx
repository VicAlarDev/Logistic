"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import type { Vehiculo } from "./ICamion";
import { useFetchCamiones } from "@/hooks/query";

export const VehiculoTable: React.FC = () => {
  const router = useRouter();

  const { data: camiones, isLoading } = useFetchCamiones();

  if (isLoading) return <div>Cargando...</div>;

  if (!camiones) return <div>No hay vehículos</div>;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Vehículos (${camiones?.length})`}
          description="Crea, modifica y elimina vehiculos."
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/vehiculo/nuevo`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Crear nuevo
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="marca" columns={columns} data={camiones} />
    </>
  );
};
