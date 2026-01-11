import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

interface Env {
  TURNSTILE_SECRET: string;
}

// Static Forms handler: houd het simpel, laat je overlay (iframe load) de UI doen
const handler = staticFormsPlugin({
  respondWith: async () => {
    return new Response("OK", {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
});

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const { request, env } = ctx;

  // Alleen POSTs (form submits) moeten Turnstile hebben
  if (request.method === "POST") {
    // Lees body 1x
    const formData = await request.formData();

    // Turnstile token uit form (implicit rendering default field name)
    const token = (formData.get("cf-turnstile-response") || "").toString().trim();
    if (!token) return new Response("Forbidden", { status: 403 });

    const ip = request.headers.get("CF-Connecting-IP") || "";

    const body = new URLSearchParams();
    body.append("secret", env.TURNSTILE_SECRET);
    body.append("response", token);
    if (ip) body.append("remoteip", ip);

    // Harde timeout op siteverify
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 4000);

    let verifyResp: Response;
    try {
      verifyResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body,
        signal: ac.signal,
      });
    } catch {
      // timeout / netwerk issue -> hard fail
      return new Response("Forbidden", { status: 403 });
    } finally {
      clearTimeout(timer);
    }

    const outcome: any = await verifyResp.json();
    if (outcome.success !== true) {
      return new Response("Forbidden", { status: 403 });
    }

    // Rebuild request zodat Static Forms plugin de body opnieuw kan lezen
    const rebuilt = new URLSearchParams();
    for (const [k, v] of formData.entries()) {
      rebuilt.append(k, String(v)); // jouw form heeft alleen strings
    }

    const rebuiltRequest = new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: rebuilt,
    });

    // ctx.request is readonly typed -> maak een nieuw context object
    const nextCtx = { ...ctx, request: rebuiltRequest };

    // Nu pas de Static Forms plugin handler
    return handler(nextCtx as any);
  }

  // Non-POST: laat plugin gewoon zijn werk doen (GET etc.)
  return handler(ctx as any);
};
