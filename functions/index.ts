import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

interface Env {
  TURNSTILE_SECRET: string;
}

// ---- Tunables ----
const SITEVERIFY_TIMEOUT_MS = 4000;

// Static Forms handler: keep it simple; your iframe-load JS handles the UI
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

// Small helper: consistent 403 responses with machine-readable reason
function forbidden(code: string) {
  return new Response(code, {
    status: 403,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const { request, env } = ctx;

  // Only POST needs Turnstile verification (GET etc. can be handled by the plugin)
  if (request.method !== "POST") {
    return handler(ctx as any);
  }

  // Read body once (we'll rebuild it for the plugin afterwards)
  const formData = await request.formData();

  // 1) Turnstile token (implicit rendering default field name)
  const token = (formData.get("cf-turnstile-response") || "").toString().trim();
  if (!token) return forbidden("FORBIDDEN_TURNSTILE_MISSING_TOKEN");

  // 2) Server-side siteverify with hard timeout
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

  // 3) Rebuild request so the Static Forms plugin can read the body again
  // (Your form only submits string fields; this is safe. If you add file uploads later,
  // you must rebuild as multipart/form-data instead.)
  const rebuilt = new URLSearchParams();
  for (const [k, v] of formData.entries()) rebuilt.append(k, String(v));

  const rebuiltRequest = new Request(request.url, {
    method: "POST",
    headers: request.headers,
    body: rebuilt,
  });

  const nextCtx = { ...ctx, request: rebuiltRequest };

  // 4) Static Forms plugin (final step)
  return handler(nextCtx as any);
};
