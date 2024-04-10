import BreadCrumb from "@/components/breadcrumb";
import { ConductorForm } from "@/components/forms/conductor/conductor-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import React from "react";

export default async function page({
  params: { conductorId },
}: {
  params: { conductorId: string };
}) {
  const title =
    conductorId === "nuevo" ? "Crear conductor" : "Editar conductor";

  const link =
    conductorId === "nuevo"
      ? "/dashboard/conductor/nuevo"
      : `/dashboard/conductor/${conductorId}`;

  const breadcrumbItems = [
    { title: "Conductor", link: "/dashboard/conductor" },
    { title: title, link: "/dashboard/conductor/nuevo" },
  ];

  const { data } = await axios.get(
    `http://localhost:3000/api/conductores/${conductorId}`,
  );

  const initialData = conductorId === "nuevo" ? null : data.conductor;

  // pasar la data al formulario en caso de que haya algun registro si no pasar null

  //const initialData = status === 200 ? data : null;

  //console.log(initialData);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <ConductorForm initialData={initialData} />
      </div>
    </ScrollArea>
  );
}
