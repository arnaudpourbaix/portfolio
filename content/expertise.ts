import type { Lang } from "@/lib/i18n";

type Expertise = { title: string; text: string; keywords: string[] };

export const expertise: Record<Lang, Expertise[]> = {
  fr: [
    {
      title: "Architecture TypeScript fullstack",
      text: "Conception et déploiement de portails applicatifs complexes en TypeScript fullstack pour le secteur bancaire multi-entités. Architectures multi-niveaux (front Angular, back NestJS, monorepos), migrations majeures (Node.js 20, frameworks legacy vers modernes), refonte des build systems (Rollup) et de la CI/CD Jenkins.",
      keywords: ["TypeScript", "Angular", "NestJS", "Node.js", "Monorepos", "Rollup"],
    },
    {
      title: "Leadership technique et qualité de code",
      text: "Standards de qualité stricts comme différenciant : linting TypeScript strict, peer programming, revue de code rigoureuse, gitflow, couverture Sonar. Encadrement de 4 à 10 développeurs par mission, recrutement et mentorat, composants transverses réutilisables.",
      keywords: ["Code review", "Peer programming", "Gitflow", "Sonar", "Mentorat"],
    },
    {
      title: "Intégration de l'IA et DevOps moderne",
      text: "Adoption de Claude Code en environnement professionnel, avec marketplace et skills pour accélérer les développeurs. Migration cloud (AWS Lambda, Dynatrace), exercice de reprise après sinistre, audit de conformité, Kubernetes et Jenkins.",
      keywords: ["Claude Code", "AWS", "Dynatrace", "Kubernetes", "Jenkins"],
    },
  ],
  en: [
    {
      title: "Fullstack TypeScript architecture",
      text: "Design and rollout of complex application portals in fullstack TypeScript for multi-entity retail banking. Multi-tier architectures (Angular front end, NestJS back end, monorepos), major migrations (Node.js 20, legacy to modern frameworks), and rebuilt build systems (Rollup) and Jenkins CI/CD.",
      keywords: ["TypeScript", "Angular", "NestJS", "Node.js", "Monorepos", "Rollup"],
    },
    {
      title: "Technical leadership and code quality",
      text: "Strict quality standards as a differentiator: strict TypeScript linting, peer programming, thorough code reviews, gitflow, Sonar coverage. Leading 4 to 10 developers per assignment, recruiting and mentoring, reusable shared components.",
      keywords: ["Code review", "Peer programming", "Gitflow", "Sonar", "Mentoring"],
    },
    {
      title: "AI adoption and modern DevOps",
      text: "Rolling out Claude Code in a professional setting, with a marketplace and skills that speed developers up. Cloud migration (AWS Lambda, Dynatrace), disaster recovery test, compliance audit, Kubernetes and Jenkins.",
      keywords: ["Claude Code", "AWS", "Dynatrace", "Kubernetes", "Jenkins"],
    },
  ],
};
