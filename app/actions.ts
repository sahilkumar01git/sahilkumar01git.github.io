"use server";

import { headers } from "next/headers";
import { submitContactMessage } from "@/lib/services/email/contactService";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

export async function sendContactMessage(_prevState: ContactState, formData: FormData): Promise<ContactState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  return submitContactMessage(ip, formData);
}
