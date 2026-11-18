# Arnaud Pourbaix

Portfolio et CV d'Arnaud Pourbaix, Tech lead fullstack TypeScript / Java
freelance. Le site est une seule page, en français (`/fr`) et en anglais
(`/en`), en mode clair. `/` redirige vers la langue préférée du navigateur,
et vers le français par défaut (`proxy.ts`) ; le sélecteur FR/EN de l'en-tête
permet de basculer.

- **Thème** : `THEME.md` fait foi (couleurs, polices, formes, mouvement).
- **Contenu** : `content/resume/` est la seule source partagée entre le site et
  le CV : présentation, chiffres, expériences, compétences, formation, langues
  et coordonnées (`data/site.json`). C'est du markdown en français (`*.fr.md`),
  avec une version anglaise à côté (`*.en.md`). `lib/resume.ts` le lit. Les
  textes propres au site sont dans `content/ui.ts` et `content/expertise.ts`,
  dans les deux langues côte à côte.
- **Réglages** : `content/settings.ts`, par exemple pour afficher ou non l'ESN
  à côté du client, séparément sur le site et dans le CV.
- **CV** : `app/(cv)/cv/[lang]` en est la page d'impression (`/cv/fr`,
  `/cv/en`), avec son propre layout, sans Tailwind. `npm run cv` builde le site
  puis l'imprime en PDF dans `public/documents/` : `CV-Arnaud-POURBAIX.pdf` en
  français, `CV-Arnaud-POURBAIX-en.pdf` en anglais. Le bouton de téléchargement
  du site pointe vers le PDF de la langue affichée. Il faut relancer la commande
  et commiter les PDF après chaque changement de contenu : Vercel n'a pas de
  Chromium pour les générer au déploiement.
- **Images** : `public/` (photo en WebP, logos des profils, CV en PDF) ; le
  favicon est `app/icon.png`. Les logos des entreprises et la photo du CV sont
  dans `content/resume/assets/`.
- **Vercel** : `vercel.json` force `npm ci`, sinon Vercel voit le workspace pnpm
  du dépôt et installe tout le monorepo.

## Commandes

| Commande | Rôle |
| --- | --- |
| `npm install` | Installer les dépendances |
| `npx playwright install chromium` | Une fois : le navigateur qui imprime le CV |
| `npm run dev -- -p 3100` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run cv` | Vérifier les traductions, builder, puis imprimer les deux CV en PDF |
| `npm test` | Tests unitaires (contenu, traductions, confidentialité) |
| `npx tsc --noEmit` | Vérification des types |

## Traductions

| Commande | Rôle |
| --- | --- |
| `npm run i18n:check` | Lister les fichiers français dont la version anglaise manque ou est périmée |
| `npm run i18n:diff -- <fichier fr>` | Montrer ce qui a changé dans un fichier français depuis sa traduction |
| `npm run i18n:stamp -- <fichiers en>` | Marquer des fichiers anglais comme à jour de leur source française |

Avant de publier, demander à Claude Code de « traduire avant de publier » : la
procédure est dans `CLAUDE.md`. Le glossaire est
`content/resume/data/glossary.md`.

Pas encore de lien de prise de rendez-vous : le contact passe par l'e-mail. Il
s'ajoute dans `content/ui.ts`, puis en bouton dans le hero et le contact.
