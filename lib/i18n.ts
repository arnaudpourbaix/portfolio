// Langues du site et du CV. Module sans node:fs : importable côté client et dans proxy.ts.
export const LANGS = ["fr", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "fr";
export const isLang = (value: string): value is Lang => (LANGS as readonly string[]).includes(value);

/** Locale de formatage des nombres et des dates. */
export const LOCALES: Record<Lang, string> = { fr: "fr-FR", en: "en-GB" };

/** Langue gérée la plus haut placée dans un en-tête Accept-Language (« en-US,en;q=0.9,fr;q=0.8 »), sinon le français. */
export function preferredLang(acceptLanguage: string | null): Lang {
  const ranked = (acceptLanguage ?? "")
    .split(",")
    .map((part, index) => {
      const [tag, ...options] = part.trim().split(";");
      const q = Number(options.map((o) => o.trim()).find((o) => o.startsWith("q="))?.slice(2) ?? 1);
      return { lang: tag.trim().toLowerCase().split("-")[0], q: Number.isNaN(q) ? 0 : q, index };
    })
    .filter((entry) => entry.q > 0)
    .sort((a, b) => b.q - a.q || a.index - b.index);
  return ranked.map((entry) => entry.lang).find(isLang) ?? DEFAULT_LANG;
}
