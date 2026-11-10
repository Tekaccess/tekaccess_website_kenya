import { site } from "@/content/site";

export type QuotePayload = Record<string, string>;
export type SubmitResult = { ok: true; reference: string } | { ok: false; error: string };

/** TA-YYMM-xxx, shown to the client and included in the email so both sides can quote it. */
export function makeReference(now = new Date()) {
  const yymm = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}`;
  const rand = Math.floor(Math.random() * 900 + 100);
  return `TA-${yymm}-${rand}`;
}

export async function submitQuote(data: QuotePayload): Promise<SubmitResult> {
  const reference = makeReference();
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...data,
        reference,
        _subject: `Quote request ${reference} — ${data.material ?? ""} ${data.from ?? ""} → ${data.to ?? ""}`.trim(),
        _template: "table",
        _captcha: "false",
      }),
      signal: ctrl.signal,
    });
    const json = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };
    // FormSubmit answers success:"false" with an activation message until the inbox confirms once.
    if (res.ok && String(json.success) === "true") return { ok: true, reference };
    return { ok: false, error: json.message || `The request was not accepted (${res.status}).` };
  } catch (e) {
    return { ok: false, error: (e as Error).name === "AbortError" ? "The request timed out." : "Network error." };
  } finally {
    clearTimeout(timer);
  }
}
