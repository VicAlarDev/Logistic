"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import type { Vehiculo } from "./ICamion";
import { useFetchData } from "@/hooks/useFetch";

export type VehiculoResponse = {
  camiones: Vehiculo[];
};

export const VehiculoTable: React.FC = () => {
  const router = useRouter();

  const { data, isLoading } = useFetchData<VehiculoResponse>(
    "http://localhost:3000/api/camiones",
    ["camiones"],
  );

  const vehiculos = data?.camiones;

  if (isLoading) return <div>Cargando...</div>;

  if (!data) return <div>No hay vehículos</div>;

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Vehículos (${vehiculos?.length})`}
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
      <DataTable searchKey="marca" columns={columns} data={vehiculos} />
    </>
  );
};
