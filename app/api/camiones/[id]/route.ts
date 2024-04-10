import { db } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, context: any) {
  const { id } = context.params;
  try {
    await db.camion.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Camion eliminado" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function GET(req: Request, context: any) {
  const { id } = context.params;
  try {
    const camion = await db.camion.findUnique({
      where: { id: Number(id) },
    });
    return NextResponse.json({ camion });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(req: Request, context: any) {
  const { id } = context.params;
  if (req.body === null) {
    throw new Error("El cuerpo de la solicitud no puede estar vacío");
  }
  const body = await req.json();
  try {
    const camion = await db.camion.update({
      where: { id: Number(id) },
      data: body,
    });
    return NextResponse.json({ camion });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
