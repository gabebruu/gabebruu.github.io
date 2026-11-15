import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Trocar pelo domínio próprio (com barra final) quando existir: atualiza canonical, hreflang, OG, JSON-LD e sitemap.
const SITE = "https://gabebruu.github.io/";

const seo = () => ({
  name: "seo",
  transformIndexHtml: (html) => html.replaceAll("__SITE__", SITE),
  generateBundle() {
    this.emitFile({ type: "asset", fileName: "robots.txt", source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n` });
    const alt = `<xhtml:link rel="alternate" hreflang="pt" href="${SITE}"/><xhtml:link rel="alternate" hreflang="en" href="${SITE}en/"/>`;
    this.emitFile({
      type: "asset",
      fileName: "sitemap.xml",
      source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n<url><loc>${SITE}</loc>${alt}</url>\n<url><loc>${SITE}en/</loc>${alt}</url>\n</urlset>\n`,
    });
  },
});

// base "/": o site é publicado na raiz (utilizador.github.io ou domínio próprio), necessário para /en/ carregar os assets
export default defineConfig({
  base: "/",
  plugins: [react(), seo()],
  build: { rollupOptions: { input: { main: "index.html", en: "en/index.html" } } },
});
