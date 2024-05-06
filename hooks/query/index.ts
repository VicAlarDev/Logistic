import {
  useQuery,
  useMutation,
  QueryClient,
  type UseQueryResult,
} from "@tanstack/react-query";
import { type Categoria, type Conductor, type Prisma } from "@prisma/client";
import type { Vehiculo } from "@/components/tables/camiones-table/ICamion";
import { type RepuestoFormValues } from "@/components/forms/repuesto/repuesto.schema";
import { useRouter } from "next/navigation";
import axios from "axios";

const queryClient = new QueryClient();

export function useFetchCamiones(): UseQueryResult<Vehiculo[], Error> {
  return useQuery<Vehiculo[], Error>({
    queryKey: ["camiones"],
    queryFn: () =>
      fetch("http://localhost:3000/api/camiones").then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });
}

export function useFetchCategorias(): UseQueryResult<Categoria[], Error> {
  return useQuery({
    queryKey: ["categorias"],
    queryFn: () =>
      fetch("http://localhost:3000/api/categorias").then((res) => res.json()),
  });
}

export function useFetchConductores(): UseQueryResult<Conductor[], Error> {
  return useQuery({
    queryKey: ["conductores"],
    queryFn: () =>
      fetch("http://localhost:3000/api/conductores").then((res) => res.json()),
  });
}

export function useCreateCamion() {
  return useMutation({
    mutationFn: (data: Prisma.CamionCreateInput) =>
      fetch("http://localhost:3000/api/camiones", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["camiones"] });
    },
  });
}

export function useCreateCategoria() {
  return useMutation({
    mutationFn: (data: Prisma.CategoriaCreateInput) =>
      fetch("http://localhost:3000/api/categorias", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
  });
}

export function useCreateConductor() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: Prisma.ConductorCreateInput) =>
      fetch("http://localhost:3000/api/conductores", {
        method: "POST",
        body: JSON.stringify(data),
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conductores"] });
      router.refresh();
      router.push(`/dashboard/conductor`);
    },
  });
}

export function useCreateRepuesto() {
  return useMutation({
    mutationFn: async (repuesto: RepuestoFormValues) => {
      const { data } = await axios.post(
        "http://localhost:3000/api/repuestos",
        repuesto,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["repuestos"] });
    },
  });
}

export function useUpdateConductor() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { id: number; info: Prisma.ConductorUpdateInput }) =>
      fetch(`http://localhost:3000/api/conductores/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data.info),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
    onSuccess: () => {
      // Invalidate and refetch the data to keep the list updated
      queryClient.invalidateQueries({ queryKey: ["conductores"] });
      router.push(`/dashboard/conductor`);
    },
    onError: (error: Error) => {
      // Handle error, possibly using a state hook to show an error message in your component
      console.error("Failed to update conductor", error);
    },
  });
}
