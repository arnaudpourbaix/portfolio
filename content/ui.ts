// Textes propres au site (interface, accroche, sections), en français et en anglais.
// Contrairement à content/resume, ces textes ne sont pas suivis par les scripts i18n : les deux langues se mettent à jour ensemble.
import type { Lang } from "@/lib/i18n";

const fr = {
  meta: { locale: "fr_FR" },
  /** PDF imprimé par `npm run cv` (scripts/build-cv.mjs). */
  cv: "/documents/CV-Arnaud-POURBAIX.pdf",
  nav: [
    { href: "#about", label: "À propos" },
    { href: "#expertise", label: "Expertises" },
    { href: "#skills", label: "Compétences" },
    { href: "#experience", label: "Parcours" },
    { href: "#contact", label: "Contact" },
  ],
  header: {
    navLabel: "Navigation principale",
    mobileNavLabel: "Navigation mobile",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    contactMe: "Me contacter",
    switchLang: { href: "/en", label: "EN", title: "Read in English", hrefLang: "en" },
  },
  hero: {
    // L'accroche de la bannière LinkedIn : le morceau `highlight` reçoit le cartouche lavande.
    pitch: [{ text: "Transformer la complexité en " }, { text: "performance.", highlight: true }],
    subtitle: "Des applications robustes, des équipes efficaces, des résultats durables.",
    tags: ["Tech Lead Freelance", "Architecture Fullstack", "Excellence logicielle"],
    contactMe: "Me contacter",
    downloadCv: "Télécharger mon CV",
    portraitAlt: "Portrait d'Arnaud Pourbaix",
  },
  about: { eyebrow: "À propos", title: "Architecte et développeur, dans le code avec l'équipe" },
  expertise: { eyebrow: "Expertises", title: "Trois savoir-faire au service de vos projets" },
  skills: { eyebrow: "Compétences", title: "TypeScript de bout en bout, du front Angular au back NestJS" },
  experience: {
    eyebrow: "Parcours",
    title: "Vingt-cinq ans de projets, de PL/SQL à TypeScript",
    business: "Enjeux métier",
    tasks: "Réalisations",
    via: "via",
  },
  contact: {
    eyebrow: "Contact",
    title: { start: "Parlons de votre ", highlight: "projet." },
    intro: "Un projet TypeScript à lancer, une refonte ou une équipe à faire monter en qualité ? Écrivez-moi ou appelez-moi.",
    cardTitle: "Échangeons sur votre projet.",
    cardText: "Par e-mail, par téléphone ou lors d'un rendez-vous de 30 minutes, comme vous préférez.",
    write: "M'écrire",
    book: "Prendre rendez-vous",
    cvPdf: "Mon CV en PDF",
  },
};

export type Ui = typeof fr;

const en: Ui = {
  meta: { locale: "en_GB" },
  cv: "/documents/CV-Arnaud-POURBAIX-en.pdf",
  nav: [
    { href: "#about", label: "About" },
    { href: "#expertise", label: "Expertise" },
    { href: "#skills", label: "Skills" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ],
  header: {
    navLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    openMenu: "Open the menu",
    closeMenu: "Close the menu",
    contactMe: "Contact me",
    switchLang: { href: "/fr", label: "FR", title: "Lire en français", hrefLang: "fr" },
  },
  hero: {
    pitch: [{ text: "Turning complexity into " }, { text: "performance.", highlight: true }],
    subtitle: "Robust applications, effective teams, lasting results.",
    tags: ["Freelance Tech Lead", "Fullstack Architecture", "Software Excellence"],
    contactMe: "Contact me",
    downloadCv: "Download my CV",
    portraitAlt: "Portrait of Arnaud Pourbaix",
  },
  about: { eyebrow: "About", title: "Architect and developer, in the code with the team" },
  expertise: { eyebrow: "Expertise", title: "Three areas of expertise for your projects" },
  skills: { eyebrow: "Skills", title: "TypeScript end to end, from Angular front ends to NestJS back ends" },
  experience: {
    eyebrow: "Experience",
    title: "Twenty-five years of projects, from PL/SQL to TypeScript",
    business: "Business focus",
    tasks: "Achievements",
    via: "via",
  },
  contact: {
    eyebrow: "Contact",
    title: { start: "Let's talk about your ", highlight: "project." },
    intro: "A TypeScript project to launch, a redesign, or a team to take to the next level of quality? Email or call me.",
    cardTitle: "Let's discuss your project.",
    cardText: "By email, by phone or in a 30-minute call, whichever you prefer.",
    write: "Email me",
    book: "Book a call",
    cvPdf: "My CV as a PDF",
  },
};

export const ui: Record<Lang, Ui> = { fr, en };
