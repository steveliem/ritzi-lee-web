export async function onRequest({ request, next }) {
    // Alleen gate-en voor POST (form submits)
    if (request.method === "POST") {
      const origin = request.headers.get("Origin") || "";
      const referer = request.headers.get("Referer") || "";
  
      // Zet jouw canonical origin hier:
      const allowed = "https://ritzi-lee.com";
  
      const originOk = origin === allowed;
      const refererOk = referer.startsWith(allowed + "/");
  
      if (!originOk || !refererOk) {
        return new Response("Forbidden", { status: 403 });
      }
    }
  
    return next();
  }
  