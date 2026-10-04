type SendEmailInput = { to: string; replyTo: string; subject: string; text: string };

// Thin wrapper around the Resend API. Missing config, network errors and non-2xx
// responses all collapse to `false` so callers don't need to know the difference.
export async function sendEmail(input: SendEmailInput): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set; email was not sent.");
    return false;
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: input.to,
        reply_to: input.replyTo,
        subject: input.subject,
        text: input.text,
      }),
    });
    if (!r.ok) {
      console.error("Resend error", await r.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("Resend request failed", err);
    return false;
  }
}
