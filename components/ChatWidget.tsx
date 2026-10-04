"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };
const HINTS = ["What has Sahil built?", "What is his tech stack?", "Tell me about his experience"];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", content: "Hi, I'm Sahil's AI assistant. Ask me about his projects, skills or experience." },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, open]);
  useEffect(() => { if (open) field.current?.focus(); }, [open]);

  function close() {
    setOpen(false);
    toggle.current?.focus();
  }

  async function send(text: string) {
    text = text.trim();
    if (!text || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-8) }),
      });
      const d = await r.json();
      setMsgs([...next, { role: "assistant", content: d.reply || d.error || "Something went wrong. Please try again." }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Network error. Check your connection and try again." }]);
    }
    setBusy(false);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <div id="chat-panel" role="dialog" aria-label="Chat about Sahil" onKeyDown={(e) => { if (e.key === "Escape") close(); }} className="mb-3 flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="font-semibold">Ask about Sahil</p>
            <button onClick={close} aria-label="Close chat" className="flex h-9 w-9 items-center justify-center rounded-full text-muted hover:text-white">
              <X aria-hidden="true" size={20} />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex"}>
                <p className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3 py-2 ${m.role === "user" ? "bg-accent" : "bg-bg text-muted"}`}>{m.content}</p>
              </div>
            ))}
            {busy && <p className="text-muted">Thinking…</p>}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {HINTS.map((h) => (
                  <button key={h} onClick={() => send(h)} className="min-h-10 rounded-full border border-line px-3 py-2 text-muted hover:text-white">{h}</button>
                ))}
              </div>
            )}
            <div ref={end} />
          </div>
          <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2 border-t border-line p-3">
            <input ref={field} value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} placeholder="Type your question" aria-label="Your question" className="min-w-0 flex-1 rounded-full border border-line bg-bg px-4 py-2 text-sm focus:border-accent" />
            <button disabled={busy} className="min-h-11 rounded-full bg-accent px-4 py-2 text-sm font-semibold disabled:opacity-50">Send</button>
          </form>
        </div>
      )}
      <button ref={toggle} onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="chat-panel" aria-label={open ? "Close chat" : "Open chat"} className="ml-auto flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-3 font-semibold shadow-lg transition hover:brightness-90">
        {open ? "Close" : "Ask my AI"}
      </button>
    </div>
  );
}
