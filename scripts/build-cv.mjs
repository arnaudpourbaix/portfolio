// Imprime le CV (/cv/fr et /cv/en) en PDF A4 dans public/documents/, à partir de la build de production.
// Usage : npm run cv (build Next, puis ce script). Il faut Chromium une fois : npx playwright install chromium.
// Les PDF sont commités : Vercel n'a pas de Chromium pour les générer au déploiement.
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import { dirname } from "node:path";
import { chromium } from "playwright";

/** Le PDF français garde l'adresse historique, déjà diffusée. */
const OUTPUT = {
  fr: "public/documents/CV-Arnaud-POURBAIX.pdf",
  en: "public/documents/CV-Arnaud-POURBAIX-en.pdf",
};

const freePort = () =>
  new Promise((resolve, reject) => {
    const server = createServer().listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.on("error", reject);
  });

async function waitUntilUp(url, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      if ((await fetch(url)).ok) return;
    } catch {
      // serveur pas encore prêt
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`${url} ne répond pas après ${timeoutMs / 1000} s`);
}

const port = await freePort();
const base = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", String(port)], {
  stdio: ["ignore", "ignore", "inherit"],
});

try {
  await waitUntilUp(`${base}/cv/fr`);
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    for (const [lang, path] of Object.entries(OUTPUT)) {
      await page.goto(`${base}/cv/${lang}`, { waitUntil: "networkidle" });
      const pdf = await page.pdf({ format: "A4", preferCSSPageSize: true, printBackground: true });
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, pdf);
      console.log(`cv: ${path}`);
    }
  } finally {
    await browser.close();
  }
} finally {
  server.kill();
}
