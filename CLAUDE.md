@AGENTS.md

# Portfolio et CV d'Arnaud Pourbaix

Site Next.js en deux langues (`/fr`, `/en`), et CV en PDF généré à partir du même contenu. Les commandes sont dans `README.md`.

## Où est le contenu

- `content/resume/` : la source unique partagée par le site et le CV. Le français est la langue source : chaque fichier `content/resume/<collection>/<slug>.fr.md` a sa version anglaise `<slug>.en.md` à côté.
- `content/ui.ts` et `content/expertise.ts` : les textes propres au site, en français et en anglais côte à côte. Les scripts i18n ne les suivent pas : il faut modifier les deux langues en même temps.
- `content/settings.ts` : les réglages d'affichage, par exemple l'affichage des ESN sur le site et dans le CV.

## Traduire avant de publier

La traduction est faite par Claude, dans une session Claude Code. Quand Arnaud demande de traduire, en général avant de publier :

1. Lancer `npm run i18n:check`. La commande liste les fichiers français dont la version anglaise est **manquante** ou **périmée** (le français a changé depuis la dernière traduction).
2. Pour chaque fichier **manquant**, créer le `<slug>.en.md` en traduisant le fichier français, en suivant `content/resume/data/glossary.md`.
   - Garder exactement les mêmes clés et la même structure de frontmatter. Ne traduire que les valeurs textuelles et le corps.
   - Ne jamais modifier `client`, `employer`, `start`, `end`, `order`, `year`, ni les noms de technologies dans `skills` et `items`.
3. Pour chaque fichier **périmé**, lancer `npm run i18n:diff -- <fichier fr>`. La commande montre exactement ce qui a changé dans le fichier français depuis la traduction, modifications non commitées comprises. Ne modifier **que les parties correspondantes** du fichier anglais. Ne jamais retraduire un fichier périmé de zéro : Arnaud corrige l'anglais à la main, et ses corrections doivent survivre. Si `i18n:diff` ne trouve aucune version commitée correspondante, demander à Arnaud avant de retraduire le fichier.
4. Lancer `npm run i18n:stamp -- <chaque fichier anglais créé ou modifié>`, puis `npm run i18n:check`, qui ne doit plus rien signaler.
5. Dire à Arnaud quels fichiers anglais ont changé, pour qu'il les relise (`git diff`).

Après une modification du contenu, régénérer les PDF avec `npm run cv` et les commiter : Vercel ne peut pas les produire au déploiement.

## Confidentialité

Ne jamais ajouter la date de naissance d'Arnaud, nulle part dans le dépôt ni sur le site généré. `tests/privacy.test.ts` le vérifie. Son numéro de téléphone est public volontairement : il figure sur le CV téléchargeable (`content/resume/data/site.json`).
