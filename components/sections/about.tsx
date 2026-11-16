import { about, stats } from "@/content/profile";
import { Counter } from "../counter";
import { Reveal } from "../reveal";
import { CARD, Section } from "../section";

export function About() {
  return (
    <Section id="about" eyebrow="À propos" title="Architecte et développeur, dans le code avec l'équipe">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
          {about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 90}>
              <div className={`${CARD} h-full p-5`}>
                <p className="font-mono text-4xl font-semibold tracking-tight text-primary">
                  <Counter value={stat.value} prefix={stat.prefix} />
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
