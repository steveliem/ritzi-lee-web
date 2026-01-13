import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

interface Env {
  TURNSTILE_SECRET: string;
  RESEND_API_KEY: string;
}

const SITEVERIFY_TIMEOUT_MS = 4000;
const EMAIL_SEND_TIMEOUT_MS = 6000;

const TO_EMAIL = "contact@ritzi-lee.com";
const FROM_EMAIL = "contact@ritzi-lee.com";

const handler = staticFormsPlugin({
  respondWith: async () => {
    return new Response("OK", {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      },
    });
  },
});

function forbidden(code: string) {
  return new Response(code, {
    status: 403,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function serverError(code: string) {
  return new Response(code, {
    status: 500,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function sendEmailViaResend(env: Env, request: Request, formData: FormData) {
  const name = (formData.get("name") || "").toString().trim().slice(0, 120);
  const email = (formData.get("email") || "").toString().trim().slice(0, 200);
  const subjectRaw = (formData.get("web") || "").toString().trim();
  const message = (formData.get("text") || "").toString().trim();

  const subject = (subjectRaw || "Website contact form").slice(0, 140);

  const ip = request.headers.get("CF-Connecting-IP") || "";
  const ua = request.headers.get("User-Agent") || "";
  const referer = request.headers.get("Referer") || "";

  const text =
    `New message from ritzi-lee.com\n\n` +
    `Name: ${name || "(empty)"}\n` +
    `Email: ${email || "(empty)"}\n` +
    `Subject: ${subject}\n\n` +
    `Message:\n${message}\n\n` +
    `---\n` +
    `IP: ${ip}\n` +
    `User-Agent: ${ua}\n` +
    `Referer: ${referer}\n` +
    `Time: ${new Date().toISOString()}\n`;

  const payload: Record<string, unknown> = {
    from: `ritzi-lee.com <${FROM_EMAIL}>`,
    to: [TO_EMAIL],
    subject,
    text,
    ...(email ? { reply_to: `${name || email} <${email}>` } : {}),
  };

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), EMAIL_SEND_TIMEOUT_MS);

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify(payload),
      signal: ac.signal,
    });

    if (!resp.ok) {
      if (resp.status === 401 || resp.status === 403) return { ok: false as const, code: "EMAIL_SEND_FAILED_AUTH" };
      if (resp.status === 422) return { ok: false as const, code: "EMAIL_SEND_FAILED_INVALID" };
      return { ok: false as const, code: "EMAIL_SEND_FAILED_PROVIDER" };
    }

    return { ok: true as const };
  } catch {
    return { ok: false as const, code: "EMAIL_SEND_FAILED_TIMEOUT" };
  } finally {
    clearTimeout(timer);
  }
}

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const { request, env } = ctx;

  // ✅ Laat GET/HEAD etc door naar plugin/site
  if (request.method !== "POST") {
    return handler(ctx as any);
  }

  // ✅ CLONE het originele request meteen (voor Static Forms plugin)
  const pluginRequest = request.clone();

  // Read body (nu alleen voor jouw checks + mail)
  const formData = await request.formData();

  // 1) Turnstile
  const token = (formData.get("cf-turnstile-response") || "").toString().trim();
  if (!token) return forbidden("FORBIDDEN_TURNSTILE_MISSING_TOKEN");

  const ip = request.headers.get("CF-Connecting-IP") || "";

  const verifyBody = new URLSearchParams();
  verifyBody.append("secret", env.TURNSTILE_SECRET);
  verifyBody.append("response", token);
  if (ip) verifyBody.append("remoteip", ip);

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), SITEVERIFY_TIMEOUT_MS);

  let verifyResp: Response;
  try {
    verifyResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: verifyBody,
      signal: ac.signal,
    });
  } catch {
    return forbidden("FORBIDDEN_TURNSTILE_SITEVERIFY_TIMEOUT");
  } finally {
    clearTimeout(timer);
  }

  let outcome: any;
  try {
    outcome = await verifyResp.json();
  } catch {
    return forbidden("FORBIDDEN_TURNSTILE_SITEVERIFY_BAD_RESPONSE");
  }

  if (outcome.success !== true) {
    return forbidden("FORBIDDEN_TURNSTILE_INVALID");
  }

  // 2) Resend mail
  const emailRes = await sendEmailViaResend(env, request, formData);
  if (!emailRes.ok) {
    return serverError(emailRes.code);
  }

  // 3) ✅ Laat Static Forms plugin het ORIGINELE request verwerken (clone)
  const nextCtx = { ...ctx, request: pluginRequest };
  return handler(nextCtx as any);
};
