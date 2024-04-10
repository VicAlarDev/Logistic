import * as z from "zod";

export const ConductorSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  apellido: z
    .string()
    .min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
  telefono: z.string().regex(/^(0412|0424|0414|0416)\d{7}$/, {
    message:
      "El teléfono debe comenzar con 0412, 0424, 0414, 0416 y ser un numero valido",
  }),
  direccion: z
    .string()
    .min(10, { message: "La direccion debe tener al menos 10 caracteres" }),
  cedula: z
    .string()
    .min(6, { message: "La cedula debe tener al menos 6 caracteres" }),
});
