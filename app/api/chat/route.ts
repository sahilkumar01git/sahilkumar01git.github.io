import { NextRequest, NextResponse } from "next/server";
import { handleChatRequest } from "@/lib/services/rag/chatService";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  const body = await req.json().catch(() => ({}));

  const result = await handleChatRequest(ip, body.messages);
  if (result.status !== 200) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json({ reply: result.reply });
}
