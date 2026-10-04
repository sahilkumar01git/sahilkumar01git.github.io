import { createRateLimiter } from "../shared/rateLimiter";
import { retrieveContext } from "./retrieval";
import { createGroqChatCompletion, type GroqChatMessage } from "./groqClient";

const INSTRUCTIONS = `You are the assistant on Sahil Kumar's portfolio website. Answer only using the CONTEXT block below, in a friendly, concise, third-person voice. Never use outside knowledge, never guess, and never invent numbers, employers, dates or skills that are not stated in CONTEXT. If the answer isn't in CONTEXT, say you don't know and suggest emailing sahil.kumar.tech01@gmail.com. Politely decline requests unrelated to Sahil.`;

const isRateLimited = createRateLimiter(10, 60_000, 60);

export type ChatResult =
  | { status: 200; reply: string }
  | { status: 400 | 429 | 502; error: string };

// The RAG service's entry point: rate-limit, validate, retrieve grounding context, generate.
export async function handleChatRequest(ip: string, rawMessages: unknown): Promise<ChatResult> {
  if (isRateLimited(ip)) {
    return { status: 429, error: "Too many messages. Try again in a minute." };
  }
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return { status: 400, error: "Invalid request." };
  }

  const messages: GroqChatMessage[] = rawMessages.slice(-8).map((m: { role?: string; content?: unknown }) => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content ?? "").slice(0, 600),
  }));

  const context = retrieveContext(messages.map((m) => m.content).join(" "));
  const system = `${INSTRUCTIONS}\n\nCONTEXT\n${context}`;

  const result = await createGroqChatCompletion([{ role: "system", content: system }, ...messages]);
  if (!result.ok) {
    return { status: 502, error: "The assistant is unavailable right now." };
  }
  return { status: 200, reply: result.content };
}
