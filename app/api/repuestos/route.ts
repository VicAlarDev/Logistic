import { NextResponse } from "next/server";
import { db } from "@/db/prisma";
import { type RepuestoFormValues } from "@/components/forms/repuesto/repuesto.schema";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.body) {
      throw new Error("El cuerpo de la solicitud no puede estar vacío");
    }

    const body = await new Response(req.body).text();

    const data: RepuestoFormValues = JSON.parse(body);

    // Processing each repuesto
    const repuestosWithRegistrations = await Promise.all(
      data.repuestos.map(async (repuesto) => {
        const createdRepuesto = await db.repuesto.create({
          data: {
            nombre: repuesto.nombre,
            marca: repuesto.marca,
            descripcion: repuesto.descripcion || null,
            fechaFabricacion: new Date(repuesto.fechaFabricacion),
            serial: repuesto.serial,
            precio: repuesto.precio,
            categoria: {
              connect: { id: repuesto.categoriaId }, // This assumes 'nombre' is unique and exists in your database
            },
          },
        });

        const registro = await db.registroRepuesto.create({
          data: {
            vehiculoPlaca: data.placa,
            repuestoId: createdRepuesto.id,
            fechaInstalacion: new Date(repuesto.fechaCambio),
          },
        });

        return {
          repuesto: createdRepuesto,
          registro: registro,
        };
      }),
    );

    return NextResponse.json({ repuestos: repuestosWithRegistrations });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      stack: error.stack,
      status: 500,
    });
  }
}
