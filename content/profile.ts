export const profile = {
  firstName: "Arnaud",
  lastName: "Pourbaix",
  fullName: "Arnaud Pourbaix",
  title: "Tech Lead Fullstack TypeScript",
  // L'accroche de la bannière LinkedIn : le morceau `highlight` reçoit le cartouche lavande.
  pitch: [{ text: "Transformer la complexité en " }, { text: "performance.", highlight: true }],
  subtitle: "Des applications robustes, des équipes efficaces, des résultats durables.",
  tags: ["Tech Lead Freelance", "Architecture Fullstack", "Excellence logicielle"],
  experience: "+25 ans",
  experienceLabel: "d'expérience",
  availability: "Disponible en freelance",
  location: "Fontainebleau, France",
  photo: "/arnaud-pourbaix.webp",
  cv: "/documents/CV-Arnaud-POURBAIX.pdf",
  email: "pourbaix.arnaud@gmail.com",
  phone: "06 26 12 27 68",
  phoneHref: "tel:+33626122768",
};

export const about = [
  "Tech Lead fullstack avec 25 ans d'expérience, dont 11 ans chez BPCE à concevoir et déployer des portails applicatifs bancaires utilisés par toutes les Caisses d'Épargne et Banques Populaires.",
  "Spécialiste TypeScript front et back (Angular, Node.js, NestJS), je reste dans le code avec l'équipe : j'encadre des équipes de 4 à 10 développeurs en mettant la qualité au centre, par la revue de code, le peer programming, le gitflow, la CI/CD, le TypeScript strict et l'analyse Sonar.",
  "Depuis 2026, je déploie Claude Code dans les équipes de développement d'Allianz. Mon socle Java/Spring reste utile là où le legacy côtoie le moderne.",
];

export const stats = [
  { value: 25, prefix: "+", label: "ans d'expérience" },
  { value: 11, label: "ans chez BPCE" },
  { value: 20, prefix: "+", label: "monorepos sous ma responsabilité" },
  { value: 10, label: "développeurs encadrés par mission, au plus" },
];

export type SocialId = "linkedin" | "malt" | "collective";

export const socials: { id: SocialId; label: string; href: string; logo: string }[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/arnaud-pourbaix-58a5981b/", logo: "/logos/linkedin.png" },
  { id: "malt", label: "Malt", href: "https://www.malt.fr/profile/arnaudpourbaix", logo: "/logos/malt.png" },
  { id: "collective", label: "Collective", href: "https://www.collective.work/profile/arnaud-pourbaix", logo: "/logos/collective.png" },
];
