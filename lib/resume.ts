// Lecture du contenu du CV (content/resume), source unique des données partagées entre le portfolio et le CV.
// Serveur uniquement (node:fs). Les lectures sont synchrones, donc prérendues à la build ; next.config.ts embarque
// content/resume dans les fonctions serveur pour les rendus à la demande.
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "yaml";
import companies from "@/content/resume/data/companies.json";
import type { Lang } from "./i18n";

export type TaskGroup = { title: string; description?: string; tasks: string[] };
export type Task = string | TaskGroup;

type ExperienceEntry = {
  title: string;
  client: string;
  employer?: string;
  start: string;
  end?: string;
  location: string;
  summary: string;
  context: string;
  business?: string[];
  tasks: Task[];
  skills?: string[];
};
type SkillEntry = { title: string; order: number; items: string[] };
type EducationEntry = { title: string; year: number; organization: string };
type AboutEntry = {
  title: string;
  pitch?: string;
  availability?: string;
  figures?: { value: string; label: string }[];
  languages?: { name: string; level: string }[];
};

const ROOT = join(process.cwd(), "content", "resume");

function parseMarkdown<T>(text: string): { data: T; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(text);
  if (!match) throw new Error("Frontmatter manquant");
  return { data: parse(match[1]) as T, body: match[2].trim() };
}

/** Une entrée par fichier (« 03-norauto »), dans la langue demandée, ou en français si la traduction manque. */
function readCollection<T>(collection: string, lang: Lang) {
  const dir = join(ROOT, collection);
  const files = readdirSync(dir);
  const slugs = [...new Set(files.filter((file) => file.endsWith(".fr.md")).map((file) => file.slice(0, -".fr.md".length)))].sort();
  return slugs.map((slug) => {
    const file = files.includes(`${slug}.${lang}.md`) ? `${slug}.${lang}.md` : `${slug}.fr.md`;
    return { slug, ...parseMarkdown<T>(readFileSync(join(dir, file), "utf8")) };
  });
}

const readEntry = <T>(collection: string, slug: string, lang: Lang) => {
  const entry = readCollection<T>(collection, lang).find((e) => e.slug === slug);
  if (!entry) throw new Error(`Contenu introuvable : ${collection}/${slug}`);
  return entry;
};

const paragraphs = (body: string) => body.split(/\r?\n\s*\r?\n/).map((paragraph) => paragraph.replace(/\s*\r?\n\s*/g, " "));

const companyLabel = (id: string) => companies.find((company) => company.id === id)?.label ?? id;

const MONTHS = {
  fr: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};
const NOW = { fr: "aujourd'hui", en: "present" };

function formatMonth(value: string, lang: Lang) {
  const [year, month] = value.split("-");
  return `${MONTHS[lang][Number(month) - 1]} ${year}`;
}

function formatPeriod(start: string, end: string | undefined, lang: Lang) {
  const period = `${formatMonth(start, lang)} - ${end ? formatMonth(end, lang) : NOW[lang]}`;
  return period.charAt(0).toUpperCase() + period.slice(1);
}

export type Experience = {
  company: string;
  /** ESN pour le compte de laquelle la mission a été réalisée, le cas échéant. */
  employer?: string;
  /** Titre complet du CV (« Tech lead TypeScript - Portail Mysys »). */
  title: string;
  /** Nom du projet, quand le titre en porte un (« Portail Mysys »). */
  project?: string;
  /** Le poste seul (« Tech lead TypeScript »). */
  role: string;
  period: string;
  /** Lieu complet (« Lille, France »). */
  location: string;
  /** Lieu sans le pays (« Lille »). */
  place: string;
  context: string;
  business: string[];
  tasks: Task[];
  stack: string[];
};

/** Expériences, de la plus récente à la plus ancienne. */
export function getExperiences(lang: Lang = "fr"): Experience[] {
  return readCollection<ExperienceEntry>("experiences", lang)
    .sort((a, b) => b.data.start.localeCompare(a.data.start))
    .map(({ data }) => {
      const [role, project] = data.title.split(" - ");
      return {
        company: companyLabel(data.client),
        employer: data.employer && companyLabel(data.employer),
        title: data.title,
        project,
        role,
        period: formatPeriod(data.start, data.end, lang),
        location: data.location,
        place: data.location.replace(/, France$/, ""),
        context: data.context,
        business: data.business ?? [],
        tasks: data.tasks,
        stack: data.skills ?? [],
      };
    });
}

export function getSkills(lang: Lang = "fr") {
  return readCollection<SkillEntry>("skills", lang)
    .map(({ data }) => data)
    .sort((a, b) => a.order - b.order)
    .map(({ title, items }) => ({ family: title, items }));
}

/** Formations, de la plus récente à la plus ancienne. */
export function getEducation(lang: Lang = "fr") {
  return readCollection<EducationEntry>("education", lang)
    .map(({ data, body }) => ({ ...data, details: paragraphs(body) }))
    .sort((a, b) => b.year - a.year);
}

export function getLanguages(lang: Lang = "fr") {
  const { data } = readEntry<AboutEntry>("about", "languages", lang);
  return { title: data.title, languages: data.languages ?? [] };
}

export type Figure = { label: string; raw: string } & ({ kind: "number"; value: number; prefix: string; suffix: string } | { kind: "text"; text: string });

/** Un chiffre clé (« +25 ans », « 80 000 ») devient un compteur animé ; le reste (« IA ») s'affiche tel quel. */
function toFigure({ value, label }: { value: string; label: string }): Figure {
  const match = /^(\+?)(\d{1,3}(?:[\s  ,]\d{3})*|\d+)(.*)$/.exec(value);
  if (!match) return { kind: "text", text: value, label, raw: value };
  return { kind: "number", value: Number(match[2].replace(/\D/g, "")), prefix: match[1], suffix: match[3], label, raw: value };
}

export function getAbout(lang: Lang = "fr") {
  const { data, body } = readEntry<AboutEntry>("about", "profile", lang);
  return {
    title: data.title,
    pitch: data.pitch ?? "",
    availability: data.availability ?? "",
    paragraphs: paragraphs(body),
    figures: (data.figures ?? []).map(toFigure),
  };
}
