import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "vitest";
import companies from "@/content/resume/data/companies.json";
import { expertise } from "@/content/expertise";
import { ui } from "@/content/ui";
import { LANGS, preferredLang } from "@/lib/i18n";
import { getAbout, getEducation, getExperiences, getLanguages, getSkills } from "@/lib/resume";

const keysDeep = (value: unknown, prefix = ""): string[] =>
  value && typeof value === "object" && !Array.isArray(value)
    ? Object.entries(value).flatMap(([key, child]) => keysDeep(child, `${prefix}${key}.`))
    : [prefix];

test("preferredLang suit l'ordre de préférence d'Accept-Language", () => {
  expect(preferredLang("en-US,en;q=0.9,fr;q=0.8")).toBe("en");
  expect(preferredLang("fr-FR,fr;q=0.9,en;q=0.8")).toBe("fr");
  expect(preferredLang("fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7")).toBe("fr");
  expect(preferredLang("de-DE,de;q=0.9,en;q=0.5")).toBe("en");
  expect(preferredLang("fr;q=0.4,en;q=0.7")).toBe("en");
  expect(preferredLang("en;q=0,fr")).toBe("fr");
  expect(preferredLang("de")).toBe("fr");
  expect(preferredLang(null)).toBe("fr");
});

test("expériences triées de la plus récente à la plus ancienne, dans les deux langues", () => {
  for (const lang of LANGS) {
    const experiences = getExperiences(lang);
    expect(experiences).toHaveLength(readdirSync("content/resume/experiences").filter((f) => f.endsWith(".fr.md")).length);
    expect(experiences[0].company).toBe("Allianz");
    expect(experiences.at(-1)!.company).toBe("AG2R La Mondiale");
  }
  expect(getExperiences("fr")[0].period).toBe("Mars 2026 - aujourd'hui");
  expect(getExperiences("en")[0].period).toBe("March 2026 - present");
});

test("chaque client et employeur des expériences existe dans companies.json", () => {
  const ids = new Set(companies.map((c) => c.id));
  for (const file of readdirSync("content/resume/experiences")) {
    const text = readFileSync(join("content/resume/experiences", file), "utf8");
    for (const [, id] of text.matchAll(/^(?:client|employer): (\S+)$/gm)) expect(ids, `${file} : ${id}`).toContain(id);
  }
});

test("le titre de mission se décompose en poste et projet", () => {
  const mysys = getExperiences("fr").find((x) => x.project === "Portail Mysys")!;
  expect(mysys.role).toBe("Tech lead TypeScript");
  expect(mysys.place).toBe("Lille");
  expect(mysys.location).toBe("Lille, France");
});

test("chiffres clés : compteur pour les nombres, texte sinon", () => {
  const [years, , users, ai] = getAbout("fr").figures;
  expect(years).toMatchObject({ kind: "number", prefix: "+", value: 25, suffix: " ans" });
  expect(users).toMatchObject({ kind: "number", value: 80000 });
  expect(ai).toMatchObject({ kind: "text", text: "IA" });
  expect(getAbout("en").figures[0]).toMatchObject({ kind: "number", value: 25, suffix: "+ years" });
  expect(getAbout("en").figures[2]).toMatchObject({ kind: "number", value: 80000 });
});

test("présentation, compétences, formation et langues existent dans les deux langues", () => {
  for (const lang of LANGS) {
    expect(getAbout(lang).paragraphs.length).toBeGreaterThan(0);
    expect(getAbout(lang).availability).not.toBe("");
    expect(getSkills(lang).length).toBeGreaterThan(0);
    expect(getEducation(lang)[0].year).toBe(1999);
    expect(getLanguages(lang).languages).toHaveLength(2);
  }
  expect(getSkills("en").map((s) => s.family)).toContain("Databases");
});

test("textes du site : mêmes clés et même nombre d'expertises en français et en anglais", () => {
  expect(keysDeep(ui.en).sort()).toEqual(keysDeep(ui.fr).sort());
  expect(ui.en.nav.map((link) => link.href)).toEqual(ui.fr.nav.map((link) => link.href));
  expect(expertise.en).toHaveLength(expertise.fr.length);
});
