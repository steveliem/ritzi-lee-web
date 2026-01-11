export async function onRequest({ request, next }) {
    if (request.method === "POST") {
      const origin = request.headers.get("Origin");
      const referer = request.headers.get("Referer");
  
      // Hard block als 1 van beide ontbreekt
      if (!origin || !referer) return new Response("Forbidden", { status: 403 });
  
      const allowedHosts = new Set(["ritzi-lee.com", "www.ritzi-lee.com"]);
  
      let o, r;
      try { o = new URL(origin); } catch { return new Response("Forbidden", { status: 403 }); }
      try { r = new URL(referer); } catch { return new Response("Forbidden", { status: 403 }); }
  
      // Alleen https
      if (o.protocol !== "https:" || r.protocol !== "https:") {
        return new Response("Forbidden", { status: 403 });
      }
  
      // Alleen jouw hosts
      if (!allowedHosts.has(o.hostname) || !allowedHosts.has(r.hostname)) {
        return new Response("Forbidden", { status: 403 });
      }
  
      // Referer moet echt van jouw site komen (pad op jouw host)
      // (dit voorkomt "https://ritzi-lee.com.evil.example/..")
      if (r.hostname !== o.hostname && !(allowedHosts.has(r.hostname) && allowedHosts.has(o.hostname))) {
        return new Response("Forbidden", { status: 403 });
      }
    }
  
    return next();
  }
  