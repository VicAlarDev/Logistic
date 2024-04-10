import * as z from "zod";

export const VehiculoSchema = z.object({
  placa: z.string().min(3, { message: "La debe tener al menos 3 caracteres" }),
  marca: z
    .string()
    .min(3, { message: "La marca debe tener al menos 3 caracteres" }),
  modelo: z
    .string()
    .min(3, { message: "El modelo debe tener al menos 3 caracteres" }),
  year: z
    .number()
    .min(1900, { message: "El año debe ser mayor a 1900" })
    .max(2025, { message: "El año debe ser menor a 2022" }),
  color: z
    .string()
    .min(6, { message: "La cedula debe tener al menos 3 caracteres" }),
  peso: z.number().min(500, { message: "El peso debe ser mayor a 500Kg" }),
  volumen: z.number().min(1, { message: "El volumen debe ser mayor a 1m3" }),
  conductorId: z.number().min(1, { message: "El conductor es requerido" }),
});
