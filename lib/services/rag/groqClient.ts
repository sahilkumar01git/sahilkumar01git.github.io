export type GroqChatMessage = { role: "system" | "user" | "assistant"; content: string };

type GroqResult = { ok: true; content: string } | { ok: false };

// Thin wrapper around Groq's chat-completions endpoint. Network/HTTP failures both
// collapse to { ok: false } so callers don't need to know the difference.
export async function createGroqChatCompletion(messages: GroqChatMessage[]): Promise<GroqResult> {
  try {
    const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL ?? "openai/gpt-oss-120b",
        temperature: 0.15,
        top_p: 0.9,
        max_tokens: 350,
        messages,
      }),
    });
    if (!r.ok) return { ok: false };
    const data = await r.json();
    return { ok: true, content: data.choices?.[0]?.message?.content ?? "" };
  } catch {
    return { ok: false };
  }
}
