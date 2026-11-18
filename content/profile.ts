// Identité et liens, communs aux deux langues. Les coordonnées viennent du contenu du CV (content/resume), source unique.
// Ce module reste importable côté client (site-header), d'où l'import JSON plutôt que node:fs.
import site from "./resume/data/site.json";

const [firstName, lastName] = site.name.split(" ");

export const profile = {
  firstName,
  lastName,
  fullName: site.name,
  title: site.title,
  location: site.location,
  photo: "/arnaud-pourbaix.webp",
  email: site.email,
  phone: site.phone,
  phoneHref: `tel:+33${site.phone.replace(/\s/g, "").slice(1)}`,
};

export type SocialId = "linkedin" | "malt" | "collective";

export const socials: { id: SocialId; label: string; href: string; logo: string }[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/arnaud-pourbaix-58a5981b/", logo: "/logos/linkedin.png" },
  { id: "malt", label: "Malt", href: "https://www.malt.fr/profile/arnaudpourbaix", logo: "/logos/malt.png" },
  { id: "collective", label: "Collective", href: "https://www.collective.work/profile/arnaud-pourbaix", logo: "/logos/collective.png" },
];
