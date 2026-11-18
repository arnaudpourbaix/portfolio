# Portfolio et CV : comparaison des données

- **Portfolio** : `content/*.ts`, en français uniquement, consommé par les composants Next.
- **CV** : `content/resume/`, copie à l'identique de `html-resume/src/content`, `src/data` et `src/assets` (18/11/2026). Markdown et frontmatter, en FR et en EN. Le `sourceHash` des fichiers `.en.md` sert au suivi des traductions (scripts `i18n-*` de html-resume).

Pour chaque écart, il faut trancher : **garder le portfolio**, **garder le CV**, **fusionner**, ou **garder les deux** (variante courte pour le web, longue pour le CV).

---

## 1. Ce qui n'existe que d'un côté

| Donnée                                       | Portfolio                               | CV                                       |
| -------------------------------------------- | --------------------------------------- | ---------------------------------------- |
| Version anglaise                             | —                                       | toutes les entrées                       |
| Formation (DUT, 1999)                        | —                                       | `education/`                             |
| Langues                                      | —                                       | `about/languages`                        |
| Centres d'intérêt (mods Baldur's Gate)       | —                                       | `about/hobbies`                          |
| Référentiel entreprises et logos             | —                                       | `data/companies.json` et `assets/logos/` |
| Contexte et enjeux métier par mission        | —                                       | `context` et `business`                  |
| Dates structurées (`2019-06`)                | texte libre (« Juin 2019 - août 2022 ») | oui                                      |
| Sous-tâches par client (PNData, Oui Energy…) | —                                       | `tasks` groupées                         |
| Calendly                                     | —                                       | `site.json`                              |
| Glossaire de traduction                      | —                                       | `data/glossary.md`                       |
| Expertise (3 blocs)                          | `expertise.ts`                          | —                                        |
| Accroche marketing, sous-titre, tags         | `profile.pitch`, `subtitle`, `tags`     | —                                        |
| Collective (réseau social)                   | `socials`                               | —                                        |
| Photo                                        | `arnaud-pourbaix.webp`                  | `assets/avatar.png`                      |
| Lien vers le PDF du CV                       | `profile.cv`                            | — (c'est ce qui le produit)              |

## 2. Profil

| Champ                            | Portfolio                      | CV                                    | Remarque                                                               |
| -------------------------------- | ------------------------------ | ------------------------------------- | ---------------------------------------------------------------------- |
| Titre                            | Tech Lead Fullstack TypeScript | Tech lead fullstack TypeScript / Java | Le portfolio écarte volontairement Java (commentaire dans `skills.ts`) |
| Localisation                     | **Fontainebleau**, France      | **Paris**, France                     | ⚠️ à trancher                                                           |
| Disponibilité                    | Disponible en freelance        | Disponible sous un mois               | Deux informations différentes, compatibles                             |
| Taille des équipes               | « de 4 à 10 développeurs »     | « une dizaine de développeurs »       |                                                                        |
| Email, téléphone, LinkedIn, Malt | identiques                     | identiques                            |                                                                        |

**Chiffres clés**

| Portfolio (`stats`)                           | CV (`figures`)                       |
| --------------------------------------------- | ------------------------------------ |
| +25 ans d'expérience                          | 25 ans d'expérience                  |
| 11 ans chez BPCE                              | 11 ans dans la banque de détail      |
| +20 monorepos sous ma responsabilité          | 80 000 utilisateurs du portail Mysys |
| 10 développeurs encadrés par mission, au plus | IA déployée dans les équipes Allianz |

⚠️ Les monorepos ne concordent pas : le portfolio dit « +20 » et « une vingtaine », le CV dit « 26 monorepos Nx ».

**Présentation** : les deux textes ont 3 paragraphes. Le CV est plus orienté métier : 50 000 conseillers Caisses d'Épargne, 30 000 utilisateurs Banques Populaires, ateliers MOA/PO, retours terrain. Le portfolio ajoute Claude Code chez Allianz depuis 2026. Une fusion semble naturelle.

## 3. Expériences

### Découpage

Le portfolio a 10 entrées, le CV en a 12. Le portfolio regroupe deux paires de missions :

| Portfolio                                                     | CV                                                                                                                |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **ELOSI** (sept. 2006 - août 2010) : Norauto et Kiloutou      | `03-norauto` (2006-09 → 2009-12), avec Norauto, **PNData** et **Oui Energy**<br>`04-kiloutou` (2010-01 → 2010-08) |
| **Unis et Norsys** (janv. 2000 - déc. 2002) : Norauto et AG2R | `00-ag2r-la-mondiale` (Norsys, 2000-01 → 2000-12)<br>`01-norauto` (Unis, 2001-01 → 2002-12)                       |

Le portfolio ne mentionne ni PNData ni Oui Energy.

### Écarts par mission

| Mission                                     | Écarts                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Allianz** (03/2026 →)                     | Résumé : « intégration de l'IA et modernisation DevOps » (portfolio) contre « tech lead transverse d'une plateforme d'API d'assurance-crédit » (CV). Seul le portfolio mentionne « freelance ». Seul le CV donne le contexte (100 lambdas, 4 squads) et le lieu (Paris). Stack : le portfolio ajoute `DevOps`. Vocabulaire : « rançongiciel » contre « ransomware ». |
| **BPCE multibanques** (09/2022 → 12/2025)   | Stack : `Angular 19` contre `Angular (17-19)`. Le portfolio n'a pas Nx, Docker, CI/CD, Git ni Hibernate. Seul le CV a les 30 000 utilisateurs et le déploiement par vagues. Lieu : aucun (portfolio), Paris (CV).                                                                                                                                                    |
| **BPCE Mysys** (06/2019 → 08/2022)          | ⚠️ Lieu : **Paris** (portfolio) contre **Lille** (CV). ⚠️ Monorepos : « une vingtaine » contre « 26 monorepos Nx ». Le portfolio n'a ni les 50 000 conseillers ni les règles de la recherche client. Stack : `Angular` contre `Angular (9-17)`, et le portfolio n'a pas Nx, Java EE ni Hibernate.                                                                      |
| **BPCE portail mobile** (01/2018 → 05/2019) | « agents en déplacement » (portfolio) contre « chargés d'affaires pro et entreprises » (CV, plus précis). Lieu : Lille dans le CV seulement.                                                                                                                                                                                                                         |
| **BPCE Myway** (01/2015 → 12/2017)          | Build : « Node.js » (portfolio) contre « Node.js/Gulp » (CV). Stack : `Sonar` dans le portfolio, `Gulp` dans le CV. Seul le CV précise le contexte (client lourd NSDK) et les ateliers métier.                                                                                                                                                                       |
| **Auchan** (08/2011 → 12/2014)              | Stack : le portfolio ajoute Java, Spring et Hibernate. Seul le CV a les enjeux UX et métier.                                                                                                                                                                                                                                                                         |
| **Pictime Group** (09/2010 → 07/2011)       | Stack : le portfolio ajoute `Java`. Graphie : « Villeneuve-d'Ascq » contre « Villeneuve d'Ascq ».                                                                                                                                                                                                                                                                    |
| **ELOSI**                                   | Stack : le portfolio a SQL, PL/SQL et Delphi, le CV Norauto n'a que Java EE et .NET (C#).                                                                                                                                                                                                                                                                            |
| **AID Micro** (01/2003 → 08/2006)           | Seul le CV a la clientèle (80 % de particuliers, 20 % de PME).                                                                                                                                                                                                                                                                                                       |
| **AG2R / Norauto (PL/SQL)**                 | Le portfolio ajoute `Oracle`. Graphie : « préretraites » contre « pré-retraites ».                                                                                                                                                                                                                                                                                   |

**Libellés à harmoniser partout** : `JEE` (portfolio) contre `Java EE` (CV), et « Lead développeur JEE / AngularJS » contre « Lead développeur Java EE AngularJS ».

## 4. Compétences

Le portfolio a 6 familles, le CV 11 groupes. Le CV ajoute Leadership, Méthodologies, Domaines d'activité, IA et Legacy.

**Uniquement dans le portfolio** : Responsive design, Java EE (le CV dit `Java (6-21)`), GitHub Actions, Linting TypeScript strict, Couverture de code, SQL, ETL.

**Uniquement dans le CV** : JavaScript, Angular Material, HTML, CSS, SCSS, Maven, WebSocket, Jasmine, JUnit, Tests fonctionnels, ESLint, Prettier, **Nx**, Vite, Kibana, Oracle, SQL Server, SQLite, T-SQL, Jira, Confluence, tout le groupe Legacy, Leadership, Méthodologies et Domaines.

**Placement différent** : AngularJS est en Frontend dans le portfolio, en Legacy dans le CV. Claude Code est dans « Outils et IA » (portfolio) ou dans « IA », avec marketplace, plugins, agents et skills (CV).

**Graphie** : `Angular (9 à 19)` contre `Angular (9-19)`.

⚠️ Nx n'apparaît nulle part dans le portfolio, alors que le CV en fait un point fort (26 monorepos Nx).

---

## Points factuels à trancher en priorité

1. Localisation : Fontainebleau ou Paris
2. Lieu de Mysys : Paris ou Lille
3. Nombre de monorepos : « +20 » ou 26
4. Découpage des missions ELOSI et Unis/Norsys : regroupées ou séparées
5. Positionnement « TypeScript » seul ou « TypeScript / Java »

---

## Décisions (18/11/2026)

Le CV devient la **source unique** : le portfolio lit `content/resume/*.fr.md` via `lib/resume.ts`. `content/experience.ts` et `content/skills.ts` sont supprimés. `content/profile.ts` ne garde que ce qui est propre au web.

| Sujet | Décision |
| --- | --- |
| Localisation | Fontainebleau (`site.json`) |
| Taille des équipes | de 4 à 10 développeurs (présentation FR et EN) |
| Titre | celui du CV : « Tech lead fullstack TypeScript / Java » (`site.json`) |
| Années d'expérience | +25 ans (25+ years en anglais) |
| Chiffres clés | ceux du CV : +25 ans, 11 ans dans la banque de détail, 80 000 utilisateurs Mysys, IA chez Allianz |
| Monorepos | 26 monorepos Nx, comme dans le CV |
| Expériences | celles du CV, plus récentes et plus riches côté métier, donc 12 missions séparées et Mysys à Lille |
| Compétences | celles du CV (11 groupes) |
| Présentation | celle du CV, plus une phrase sur Claude Code chez Allianz (reprise du portfolio) |

**Propre au portfolio** : l'accroche, le sous-titre, les tags, « Disponible en freelance », la photo, le lien vers le PDF, les réseaux sociaux (dont Collective) et l'expertise.

**Abandonnés avec l'ancien `skills.ts`** : Responsive design, GitHub Actions, Linting TypeScript strict, Couverture de code, SQL et ETL. ETL reste dans les compétences de la mission Pictime. Il faut les ajouter au CV si tu veux les garder.
