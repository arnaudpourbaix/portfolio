import { ui } from "@/content/ui";
import { LOCALES, type Lang } from "@/lib/i18n";
import { getAbout } from "@/lib/resume";
import { Counter } from "../counter";
import { Reveal } from "../reveal";
import { CARD, Section } from "../section";

export function About({ lang }: { lang: Lang }) {
  const t = ui[lang].about;
  const about = getAbout(lang);
  return (
    <Section id="about" eyebrow={t.eyebrow} title={t.title}>
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {about.figures.map((figure, i) => (
            <Reveal key={figure.label} delay={i * 90}>
              <div className={`${CARD} h-full p-5`}>
                <p className="font-mono text-4xl font-semibold tracking-tight text-primary">
                  {figure.kind === "number" ? <Counter value={figure.value} locale={LOCALES[lang]} prefix={figure.prefix} suffix={figure.suffix} /> : figure.text}
                </p>
                <p className="mt-2 text-sm text-muted">{figure.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
