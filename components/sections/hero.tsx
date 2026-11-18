import Image from "next/image";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { getAbout } from "@/lib/resume";
import { HeroLight } from "../hero-light";
import { DownloadIcon, MailIcon } from "../icons";

export function Hero({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const about = getAbout(lang);
  const experience = about.figures[0];

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <HeroLight />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {experience && (
              <p className="font-mono text-sm">
                <span className="font-bold text-primary">{experience.raw}</span> <span className="uppercase text-muted">{experience.label}</span>
              </p>
            )}
            {about.availability && (
              <p className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-available shadow-card">
                <span className="available-pulse size-2 rounded-full bg-available-dot" />
                {about.availability}
              </p>
            )}
          </div>

          <p className="mt-6 text-lg font-semibold sm:text-xl">{profile.title[lang]}</p>

          <h1 className="mt-3 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {t.hero.pitch.map((part) =>
              part.highlight ? (
                <span key={part.text} className="cartouche">
                  {part.text}
                </span>
              ) : (
                <span key={part.text}>{part.text}</span>
              ),
            )}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{t.hero.subtitle}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {t.hero.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-surface/80 px-3.5 py-1.5 text-[13px] font-medium shadow-card backdrop-blur">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-primary-foreground transition-shadow hover:shadow-card-hover"
            >
              <MailIcon /> {t.hero.contactMe}
            </a>
            <a
              href={t.cv}
              download
              className="inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 text-[15px] font-semibold shadow-card transition-shadow hover:shadow-card-hover"
            >
              <DownloadIcon /> {t.hero.downloadCv}
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[320px] lg:max-w-[380px]">
          <Image
            src={profile.photo}
            alt={t.hero.portraitAlt}
            width={720}
            height={720}
            priority
            sizes="(min-width: 1024px) 380px, 320px"
            className="aspect-square w-full rounded-full border-[10px] border-surface object-cover shadow-card-hover"
          />
        </div>
      </div>
    </section>
  );
}
