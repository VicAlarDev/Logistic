import { NextResponse } from "next/server";
import { db } from "@/db/prisma";

export async function GET() {
  try {
    const categorias = await db.categoria.findMany();
    return NextResponse.json(categorias);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
