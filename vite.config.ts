import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { services } from "./src/content/services";
import { corridors } from "./src/content/corridors";
import { staticInsights } from "./src/content/insights";
import { legal } from "./src/content/legal";
import { site } from "./src/content/site";

/** Emits sitemap.xml at build time from the same content files the routes use. */
function sitemap(): Plugin {
  return {
    name: "tekaccess-sitemap",
    apply: "build",
    generateBundle() {
      const paths = [
        "/",
        "/services",
        ...services.map((s) => `/services/${s.slug}`),
        "/corridors",
        ...corridors.map((c) => `/corridors/${c.slug}`),
        "/about",
        "/insights",
        ...staticInsights.map((p) => `/insights/${p.slug}`),
        "/contact",
        ...legal.map((l) => `/legal/${l.slug}`),
      ];
      const today = new Date().toISOString().slice(0, 10);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
        .map((p) => `  <url><loc>${site.url}${p}</loc><lastmod>${today}</lastmod></url>`)
        .join("\n")}\n</urlset>\n`;
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: xml });
    },
  };
}

export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [react(), sitemap()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  build: {
    rollupOptions: {
      output: {
        // keep the big, rarely-changing libraries in their own long-cached chunks
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          gsap: ["gsap", "@gsap/react"],
        },
      },
    },
  },
});
