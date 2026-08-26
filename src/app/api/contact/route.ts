import { site } from "@/data/site";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const MAX_BODY_SIZE = 8_000;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ error: "Unsupported content type." }, { status: 415 });
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_SIZE) {
    return Response.json({ error: "Message is too large." }, { status: 413 });
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";
  const website = typeof payload.website === "string" ? payload.website.trim() : "";

  // Silently accept submissions that fill the hidden honeypot.
  if (website) {
    return new Response(null, { status: 204 });
  }

  if (
    !name ||
    name.length > 100 ||
    !email ||
    email.length > 320 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !message ||
    message.length > 5_000
  ) {
    return Response.json({ error: "Invalid form fields." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form is missing RESEND_API_KEY.");
    return Response.json({ error: "Email service is not configured." }, { status: 503 });
  }

  const safeName = name.replace(/[\r\n]+/g, " ");

  try {
    const resendResponse = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "davidochoa.gt/1.0",
      },
      body: JSON.stringify({
        from: `David Ochoa Website <website@${new URL(site.url).hostname}>`,
        to: [site.email],
        reply_to: email,
        subject: `New portfolio inquiry from ${safeName}`,
        text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!resendResponse.ok) {
      console.error("Resend rejected a contact submission.", {
        status: resendResponse.status,
        response: await resendResponse.text(),
      });
      return Response.json({ error: "Email could not be sent." }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact email request failed.", error);
    return Response.json({ error: "Email could not be sent." }, { status: 502 });
  }
}
