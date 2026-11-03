import { events } from "@/data/events";

export async function GET(request: Request) {
  return Response.json(events);
}
