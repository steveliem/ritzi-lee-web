import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

interface Env {
  TURNSTILE_SECRET: string;
}

const handler = staticFormsPlugin({
  respondWith: async () => {
    return new Response("OK", {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
});

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const start = Date.now();
  console.log("TURNSTILE_WRAPPER_V4", new Date().toISOString());

  const { request, env } = ctx;

  const withHeaders = (res: Response) => {
    res.headers.set("x-rl-turnstile", "v4");
    res.headers.set("x-rl-ms", String(Date.now() - start));
    return res;
  };

  // Alleen POSTs (form submits) moeten Turnstile hebben
  if (request.method === "POST") {
    const formData = await request.formData();

    const token = (formData.get("cf-turnstile-response") || "").toString().trim();
    if (!token) {
      return withHeaders(new Response("Forbidden", { status: 403 }));
    }

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
      return withHeaders(new Response("Forbidden", { status: 403 }));
    } finally {
      clearTimeout(timer);
    }

    const outcome: any = await verifyResp.json();
    if (outcome.success !== true) {
      return withHeaders(new Response("Forbidden", { status: 403 }));
    }

    // Rebuild request zodat Static Forms plugin de body opnieuw kan lezen
    const rebuilt = new URLSearchParams();
    for (const [k, v] of formData.entries()) rebuilt.append(k, String(v));

    const rebuiltRequest = new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: rebuilt,
    });

    const nextCtx = { ...ctx, request: rebuiltRequest };

    const res = await handler(nextCtx as any);
    return withHeaders(res);
  }

  // Non-POST
  const res = await handler(ctx as any);
  return withHeaders(res);
};
