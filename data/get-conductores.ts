import type { Conductor } from "@prisma/client";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

type ConductorResponse = {
  conductores: Conductor[];
};

export function useGetConductores(): UseQueryResult<ConductorResponse> {
  return useQuery({
    queryKey: ["conductores"],
    queryFn: async () => {
      const { data } = await axios.get("http://localhost:3000/api/conductores");
      return data;
    },
  });
}
