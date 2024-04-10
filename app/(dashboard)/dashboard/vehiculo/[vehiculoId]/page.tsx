import BreadCrumb from "@/components/breadcrumb";
import { VehiculoForm } from "@/components/forms/vehiculo/vehiculo-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import React from "react";

export default async function page({
  params: { vehiculoId },
}: {
  params: { vehiculoId: string };
}) {
  const title = vehiculoId === "nuevo" ? "Crear vehículo" : "Editar vehículo";

  const link =
    vehiculoId === "nuevo"
      ? "/dashboard/vehiculo/nuevo"
      : `/dashboard/vehiculo/${vehiculoId}`;

  const breadcrumbItems = [
    { title: "Vehiculo", link: "/dashboard/vehiculo" },
    { title: title, link: "/dashboard/vehiculo/nuevo" },
  ];

  const { data } = await axios.get(
    `http://localhost:3000/api/camiones/${vehiculoId}`,
  );

  const { data: conductores } = await axios.get(
    "http://localhost:3000/api/conductores",
  );

  const initialData = vehiculoId === "nuevo" ? null : data.camion;

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <VehiculoForm
          initialData={initialData}
          conductores={conductores.conductores}
        />
      </div>
    </ScrollArea>
  );
}
