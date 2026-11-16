# Arnaud Pourbaix

Portfolio d'Arnaud Pourbaix, Tech Lead Fullstack TypeScript
freelance. Une seule page en français, en mode clair.

- **Thème** : `THEME.md` fait foi (couleurs, polices, formes, mouvement).
- **Contenu** : `content/` est la seule source (profil, chiffres, liens,
  expertises, compétences, expériences). Les sections ne recopient rien en dur.
- **Images** : `public/` (photo en WebP, logos des profils, CV en PDF) ; le
  favicon est `app/icon.png`.
- **Vercel** : `vercel.json` force `npm ci`, sinon Vercel voit le workspace pnpm
  du dépôt et installe tout le monorepo.

```bash
npm install
npm run dev -- -p 3100
npx tsc --noEmit
npm run build
```

Pas encore de lien de prise de rendez-vous : le contact passe par l'e-mail. Il
s'ajoute dans `content/profile.ts`, puis en bouton dans le hero et le contact.
