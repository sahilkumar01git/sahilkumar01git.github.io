// Per-key sliding-window limiter, shared by every service that needs best-effort
// per-IP throttling on serverless (in-memory, so it resets on cold start).
// A second, key-independent cap bounds total traffic, so spoofed or missing
// IP headers cannot be used to burn through paid APIs.
export function createRateLimiter(maxHits: number, windowMs: number, globalMaxHits = maxHits * 10) {
  const hits = new Map<string, number[]>();
  let global: number[] = [];

  return function isRateLimited(key: string): boolean {
    const now = Date.now();
    global = global.filter((t) => now - t < windowMs);
    if (global.length >= globalMaxHits) return true;

    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    if (recent.length >= maxHits) return true;

    hits.set(key, [...recent, now]);
    global.push(now);
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
    }
    return false;
  };
}
