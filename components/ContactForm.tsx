"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { sendContactMessage, type ContactState } from "../app/actions";

const initialState: ContactState = { status: "idle", message: "" };
const btn = "inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 font-semibold transition hover:brightness-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";
const field = "mt-1 w-full rounded-lg border border-line bg-bg/40 px-4 py-3 text-sm outline-none focus:border-accent";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className={btn + " disabled:opacity-50"}>
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  return (
    <div className="mt-8">
      {state.status === "success" ? (
        <p className="text-accent-text">{state.message}</p>
      ) : (
        <form action={formAction} className="mx-auto grid max-w-xl gap-4 text-left">
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
          <div>
            <label htmlFor="fullName" className="text-sm text-muted">Full name</label>
            <input id="fullName" name="fullName" type="text" required maxLength={100} className={field} />
          </div>
          <div>
            <label htmlFor="email" className="text-sm text-muted">Email</label>
            <input id="email" name="email" type="email" required maxLength={200} className={field} />
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-muted">Message</label>
            <textarea id="message" name="message" required maxLength={2000} rows={5} className={field} />
          </div>
          <div className="flex items-center gap-4">
            <SubmitButton />
            {state.status === "error" && (
              <p aria-live="polite" className="text-sm text-red-400">{state.message}</p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
