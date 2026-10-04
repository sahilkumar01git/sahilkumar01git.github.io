import { ALWAYS_INCLUDE, getFactChunks } from "./factBase";

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "to", "of", "in", "on", "for", "and", "or",
  "with", "what", "which", "who", "whom", "does", "did", "do", "has", "have", "had", "about", "tell",
  "me", "his", "him", "he", "can", "you", "your", "i",
]);

// Crude stemming so "projects"/"project", "worked"/"work" etc. match without an exact substring hit.
function normalize(word: string): string {
  if (word.endsWith("ing") && word.length > 5) return word.slice(0, -3);
  if (word.endsWith("ed") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("es") && word.length > 4) return word.slice(0, -2);
  if (word.endsWith("s") && word.length > 3) return word.slice(0, -1);
  return word;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t))
    .map(normalize);
}

// Retrieval step: score each fact chunk against the conversation, keep only what's relevant.
// Falls back to the full fact set when nothing scores, so an unmatched query never starves the model of context.
export function retrieveContext(query: string): string {
  const chunks = getFactChunks();
  const tokens = tokenize(query);
  const scored = chunks.map((chunk) => {
    const haystackWords = new Set(tokenize(`${chunk.keywords.join(" ")} ${chunk.text}`));
    const score = tokens.reduce((sum, t) => sum + (haystackWords.has(t) ? 1 : 0), 0);
    return { chunk, score };
  });
  const matched = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.chunk);

  const selected = matched.length > 0 ? matched.slice(0, 5) : chunks;
  const baseline = chunks.filter((c) => ALWAYS_INCLUDE.has(c.id) && !selected.includes(c));
  return [...baseline, ...selected].map((c) => c.text).join("\n");
}
