import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

/**
 * Custom hook for making a POST request and handling the response.
 * @param category - The category for the POST request.
 * @param message - The description message for the toast notification.
 * @param to - The route to navigate to after successful POST request.
 * @returns A mutation function provided by react-query's `useMutation` hook.
 */
export function usePost(category: string, message: string, to: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: any) => {
      await axios.post(`http://localhost:3000/api/${category}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [category] });
      toast({
        title: "Elemento creado ✅",
        description: message,
      });
      router.push(`/dashboard/${to}`);
    },
    onError: () => {
      toast({
        title: "Error al crear el elemento",
        description: "Ocurrió un error al intentar crear el elemento.",
      });
    },
  });
}
