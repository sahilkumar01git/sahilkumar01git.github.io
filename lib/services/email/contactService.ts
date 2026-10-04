import { createRateLimiter } from "../shared/rateLimiter";
import { sendEmail } from "./resendClient";

const TO_EMAIL = "sahil.kumar.tech01@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isRateLimited = createRateLimiter(5, 60_000, 30);

export type ContactResult = { status: "success" | "error"; message: string };

// The contact service's entry point: honeypot, rate-limit, validate, then send.
export async function submitContactMessage(ip: string, formData: FormData): Promise<ContactResult> {
  // Honeypot: real visitors never fill this hidden field.
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { status: "success", message: "Thanks! I'll get back to you soon." };
  }

  if (isRateLimited(ip)) {
    return { status: "error", message: "Too many messages. Please try again in a minute." };
  }

  const fullName = String(formData.get("fullName") ?? "").trim().slice(0, 100);
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const message = String(formData.get("message") ?? "").trim().slice(0, 2000);

  if (!fullName || !email || !message) {
    return { status: "error", message: "Please fill in your name, email and message." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  const sent = await sendEmail({
    to: TO_EMAIL,
    replyTo: email,
    subject: `New message from ${fullName}`,
    text: `From: ${fullName} <${email}>\n\n${message}`,
  });
  if (!sent) {
    return { status: "error", message: "Message could not be sent right now. Please email me directly instead." };
  }

  return { status: "success", message: "Thanks! I'll get back to you soon." };
}
