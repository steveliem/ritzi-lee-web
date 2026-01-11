import staticFormsPlugin from "@cloudflare/pages-plugin-static-forms";

export const onRequest = staticFormsPlugin({
  respondWith: async ({ formData, name }) => {
    // hier kun je eventueel extra checks doen op velden, lengte, etc.
    // Maar de Origin/Referer gate doen we in middleware (volgende stap).

    // Geef een mini HTML terug die naar de parent window seint: "ok"
    return new Response(
      `<!doctype html><html><body>
        <script>
          // postMessage naar parent (jouw pagina)
          parent.postMessage({ type: "form", ok: true, form: ${JSON.stringify(name)} }, location.origin);
        </script>
      </body></html>`,
      { headers: { "content-type": "text/html; charset=utf-8" } }
    );
  },
});
