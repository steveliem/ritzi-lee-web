export async function onRequest({ request, next }) {
    if (request.method === "POST") {
      const origin = request.headers.get("Origin") || "";
      const referer = request.headers.get("Referer") || "";
  
      // Alleen HTTPS + alleen deze hosts toestaan
      const allowedHosts = new Set(["ritzi-lee.com", "www.ritzi-lee.com"]);
  
      // Origin check (meestal aanwezig bij form POST)
      if (origin) {
        let o;
        try {
          o = new URL(origin);
        } catch {
          return new Response("Forbidden", { status: 403 });
        }
  
        const originOk = o.protocol === "https:" && allowedHosts.has(o.hostname);
        if (!originOk) return new Response("Forbidden", { status: 403 });
      } else {
        // Als Origin ontbreekt: block (strenger) of laat door (soepeler).
        // Voor jouw use-case (form submit) kun je streng zijn:
        return new Response("Forbidden", { status: 403 });
      }
  
      // Referer check (ook meestal aanwezig)
      if (referer) {
        let r;
        try {
          r = new URL(referer);
        } catch {
          return new Response("Forbidden", { status: 403 });
        }
  
        const refererOk = r.protocol === "https:" && allowedHosts.has(r.hostname);
        if (!refererOk) return new Response("Forbidden", { status: 403 });
      } else {
        // Zelfde keuze als bij Origin
        return new Response("Forbidden", { status: 403 });
      }
    }
  
    return next();
  }
  