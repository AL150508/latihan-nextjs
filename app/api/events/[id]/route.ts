import { events } from "@/data/events";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return NextResponse.json(
      { pesan: "Event tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(event);
}
