import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

interface Env {
  TURNSTILE_SECRET: string;
}

// 1) jouw bestaande Static Forms handler (ongewijzigd)
const handler = staticFormsPlugin({
  respondWith: async ({ formData, name }) => {
    return new Response(
      `<!doctype html><html><body>
        <script>
          parent.postMessage({ type: "form", ok: true, form: ${JSON.stringify(name)} }, location.origin);
        </script>
      </body></html>`,
      { headers: { "content-type": "text/html; charset=utf-8" } }
    );
  },
});

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const { request, env } = ctx;

  // Alleen POSTs (form submits) moeten Turnstile hebben
  if (request.method === "POST") {
    // Lees body 1x
    const formData = await request.formData();

    // 2) Turnstile token uit form
    const token = (formData.get("cf-turnstile-response") || "").toString().trim();
    if (!token) return new Response("Forbidden", { status: 403 });

    const ip = request.headers.get("CF-Connecting-IP") || "";

    const body = new URLSearchParams();
    body.append("secret", env.TURNSTILE_SECRET);
    body.append("response", token);
    if (ip) body.append("remoteip", ip);

    const verifyResp = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });

    const outcome: any = await verifyResp.json();
    if (outcome.success !== true) {
      return new Response("Forbidden", { status: 403 });
    }

    // 3) Rebuild request zodat Static Forms plugin de body opnieuw kan lezen
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

    // 4) Nu pas de Static Forms plugin handler
    return handler(nextCtx as any);
  }

  // Non-POST: laat plugin gewoon zijn werk doen (GET etc.)
  return handler(ctx as any);
};
