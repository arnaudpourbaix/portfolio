export type Experience = {
  company: string;
  context?: string;
  role: string;
  period: string;
  place?: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    company: "Allianz",
    role: "Tech Lead",
    period: "Mars 2026 - aujourd'hui",
    summary: "Mission de Tech Lead freelance : intégration de l'IA et modernisation de l'infrastructure DevOps.",
    highlights: [
      "Mise en place de l'IA au sein des équipes (Claude Code, marketplace et skills)",
      "Migration d'une soixantaine de lambdas vers Dynatrace (DevOps et AWS)",
      "Exercice de reprise après sinistre simulant une panne majeure de datacenter et une attaque par rançongiciel",
      "Supervision d'un audit de conformité (ARS)",
    ],
    stack: ["TypeScript", "AWS", "Claude Code", "Dynatrace", "DevOps"],
  },
  {
    company: "BPCE",
    context: "Portail multi-banques",
    role: "Tech Lead TypeScript",
    period: "Septembre 2022 - décembre 2025",
    summary: "Portail applicatif multi-banques : adaptation pour les Banques Populaires, migration Node.js 20, qualité des dépôts à l'échelle.",
    highlights: [
      "Adaptation du portail au multi-banques et déploiement pour toutes les Banques Populaires",
      "Migration vers Node.js 20 avec un nouveau système de build Rollup",
      "Qualité des dépôts : TypeScript strict, linters stricts, analyse Sonar",
      "Encadrement d'une dizaine de développeurs : contrôle des PR, revue de code, peer programming, respect du gitflow",
      "Ajustement des configurations Jenkins et des images Docker de la chaîne CI/CD",
    ],
    stack: ["TypeScript", "Angular 19", "Node.js", "NestJS", "TypeORM", "Jenkins", "Sonar", "Rollup", "JEE"],
  },
  {
    company: "BPCE",
    context: "Portail Mysys",
    role: "Tech Lead TypeScript",
    period: "Juin 2019 - août 2022",
    place: "Paris",
    summary: "Création de l'architecture fullstack Node.js / NestJS d'un portail applicatif, sur plus de 20 monorepos.",
    highlights: [
      "Portail applicatif de lancement des processus bancaires, déployé pour les Caisses d'Épargne",
      "Backend Node.js / NestJS et front Angular",
      "Tech Lead d'une vingtaine de monorepos et encadrement d'une équipe de 4 développeurs",
      "Mise en place du gitflow et d'un outil de gestion des releases et changelogs",
      "Conception de la base de données, des services NestJS et de plusieurs applications Angular",
    ],
    stack: ["TypeScript", "Angular", "Node.js", "NestJS", "TypeORM", "API REST"],
  },
  {
    company: "BPCE",
    context: "Portail mobile",
    role: "Tech Lead TypeScript",
    period: "Janvier 2018 - mai 2019",
    summary: "Création d'une application web pour les agents en déplacement.",
    highlights: ["Portail applicatif web pour les agents en déplacement (AngularJS)", "Encadrement technique des développeurs"],
    stack: ["TypeScript", "AngularJS", "Java EE"],
  },
  {
    company: "BPCE",
    context: "Projet Myway",
    role: "Tech Lead TypeScript",
    period: "Janvier 2015 - décembre 2017",
    summary: "Migration des processus bancaires d'un client lourd vers une application web conçue de zéro.",
    highlights: [
      "Nouvelle application web TypeScript / AngularJS remplaçant un client lourd",
      "Normes de développement TypeScript / AngularJS et système de build Node.js",
      "Encadrement technique d'une dizaine de développeurs",
      "Librairies de composants transverses et plusieurs applications",
    ],
    stack: ["TypeScript", "AngularJS", "Node.js", "Sonar", "Java EE"],
  },
  {
    company: "Auchan",
    context: "via Proxiad",
    role: "Lead développeur JEE / AngularJS",
    period: "Août 2011 - décembre 2014",
    place: "Lille",
    summary: "Applications JEE développées de zéro, refonte d'interface et animation d'équipe.",
    highlights: [
      "Série d'applications JEE développées de zéro, backend et frontend",
      "Refonte ergonomique d'une application de visualisation du chiffre d'affaires (AngularJS)",
      "Choix et mise en place de l'architecture, recrutement et encadrement de développeurs",
    ],
    stack: ["JEE", "AngularJS", "Java", "Spring", "Hibernate"],
  },
  {
    company: "Pictime Group",
    context: "via Astek",
    role: "Lead développeur JEE",
    period: "Septembre 2010 - juillet 2011",
    place: "Villeneuve-d'Ascq",
    summary: "Migration des sites Phildar et Grain de Malice vers une nouvelle version majeure d'un framework JEE interne.",
    highlights: ["Migration des sites et mise à jour du code", "Flux de migration de données par ETL"],
    stack: ["JEE", "Java", "ETL"],
  },
  {
    company: "ELOSI",
    role: "Lead développeur JEE / .NET",
    period: "Septembre 2006 - août 2010",
    place: "Roubaix",
    summary: "Applications JEE et .NET pour Norauto et Kiloutou.",
    highlights: [
      "Norauto : applications JEE et .NET (C#), plusieurs projets de zéro, encadrement d'un ou deux développeurs",
      "Kiloutou : suivi GPS des véhicules de livraison et centralisation de la facturation",
    ],
    stack: ["JEE", ".NET (C#)", "SQL", "PL/SQL", "Delphi"],
  },
  {
    company: "AID Micro",
    role: "Co-gérant",
    period: "Janvier 2003 - août 2006",
    place: "Lille",
    summary: "Création et gestion d'une société de dépannage informatique pour particuliers et PME.",
    highlights: [],
    stack: [],
  },
  {
    company: "Unis et Norsys",
    role: "Développeur PL/SQL",
    period: "Janvier 2000 - décembre 2002",
    place: "Villeneuve-d'Ascq",
    summary: "Norauto : migration de la base de données vers l'euro. AG2R La Mondiale : application de gestion des préretraites et calcul des rentes.",
    highlights: [],
    stack: ["PL/SQL", "SQL", "Oracle"],
  },
];
