import { profile, socials } from "@/content/profile";
import type { Lang } from "@/lib/i18n";

export function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted sm:flex-row sm:px-6">
        <p>
          {profile.fullName} · {profile.title[lang]}
        </p>
        <ul className="flex gap-5">
          {socials.map((social) => (
            <li key={social.id}>
              <a href={social.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
