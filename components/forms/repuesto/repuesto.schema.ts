import * as z from "zod";

export const RepuestoSchema = z.object({
  placa: z.string(),
  repuestos: z.array(
    z.object({
      nombre: z.string().min(3, {
        message: "El nombre del repuesto debe tener al menos 3 caracteres",
      }),
      marca: z.string().min(3, {
        message: "La marca del repuesto debe tener al menos 3 caracteres",
      }),
      descripcion: z
        .string()
        .min(3, { message: "La descripción debe tener al menos 3 caracteres" })
        .nullable(),
      fechaFabricacion: z.string().date("Fecha de fabricación inválida"),
      serial: z
        .string()
        .min(3, { message: "El serial debe tener al menos 3 caracteres" }),
      precio: z.coerce
        .number()
        .positive({ message: "El precio debe ser mayor a 0" })
        .nullable(),
      categoriaId: z
        .number(),
      fechaCambio: z.string().date("Fecha de cambio inválida"),
    }),
  ),
});

export type RepuestoFormValues = z.infer<typeof RepuestoSchema>;
