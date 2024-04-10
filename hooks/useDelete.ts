import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

/**
 * Una función personalizada para realizar mutaciones de eliminación en diferentes categorías.
 * @param {string} category La categoría a la cual pertenece el elemento a eliminar (ej. 'conductores', 'vehiculos').
 * @param {string} message El mensaje a mostrar en el toast de éxito.
 * @param {string} to La ruta a la cual redirigir al usuario después de eliminar el elemento.
 * @param {number} idToDelete El ID del elemento a eliminar.
 * @param {Function} setOpen Función para manejar la visibilidad de un modal u otro componente (opcional).
 * @returns La mutación configurada con React Query.
 */
export function useDeleteItem(
  category: string,
  message: string,
  to: string,
  idToDelete: number,
  setOpen?: Function,
) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:3000/api/${category}/${idToDelete}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [category] });
      toast({
        title: "Elemento eliminado 🗑️",
        description: message,
      });
      if (setOpen) setOpen(false);
      router.push(`/dashboard/${to}`);
    },
    onError: () => {
      toast({
        title: "Error al eliminar el elemento",
        description: "Ocurrió un error al intentar eliminar el elemento.",
      });
    },
  });
}
