"use client";
import React from "react";
import { RegistrarRepuesto } from "./create-repuesto";
import type { Categoria } from "@prisma/client";
import { useFetchCamiones, useFetchCategorias } from "@/hooks/query";

export type CategoriaResponse = {
  categorias: Categoria[];
};

export const RepuestoForm: React.FC = () => {
  const { data: vehiculos } = useFetchCamiones();

  const { data: categorias } = useFetchCategorias();

  return (
    <>
      <RegistrarRepuesto
        initialData={null}
        vehiculos={vehiculos}
        categorias={categorias}
      />
    </>
  );
};
