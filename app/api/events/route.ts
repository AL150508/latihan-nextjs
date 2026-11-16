import { events } from "@/data/events";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(events);
}
