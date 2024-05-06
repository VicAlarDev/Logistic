import { NextResponse } from "next/server";
import { db } from "@/db/prisma";
import { type Prisma } from "@prisma/client";

export async function GET() {
  try {
    const conductores = await db.conductor.findMany();
    return NextResponse.json(conductores);
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
    const data: Prisma.ConductorCreateInput = JSON.parse(requestBody);
    const conductor = await db.conductor.create({ data });
    return NextResponse.json({ conductor });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
