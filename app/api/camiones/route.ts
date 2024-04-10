import { NextResponse } from "next/server";
import { db } from "@/db/prisma";
import { type Prisma } from "@prisma/client";

export async function GET() {
  try {
    const camiones = await db.camion.findMany({ include: { chofer: true } });
    return NextResponse.json({ camiones });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function POST(req: Request) {
  try {
    if (req.body === null) {
      throw new Error("El cuerpo de la solicitud no puede estar vacío");
    }
    const requestBody = await new Response(req.body).text();
    const data: Prisma.CamionCreateInput = JSON.parse(requestBody);
    const camion = await db.camion.create({ data });
    return NextResponse.json({ camion });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
