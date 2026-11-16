import { expertise } from "@/content/expertise";
import { Reveal } from "../reveal";
import { CARD, Section } from "../section";

export function Expertise() {
  return (
    <Section id="expertise" eyebrow="Expertises" title="Trois savoir-faire au service de vos projets">
      <div className="grid gap-5 md:grid-cols-3">
        {expertise.map((item, i) => (
          <Reveal key={item.title} delay={i * 110}>
            <article className={`${CARD} flex h-full flex-col p-7`}>
              <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-lg bg-accent font-mono text-sm font-semibold text-primary">
                0{i + 1}
              </span>
              <h3 className="mt-5 text-xl font-bold leading-snug tracking-tight">{item.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{item.text}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {item.keywords.map((keyword) => (
                  <li key={keyword} className="rounded-full bg-background px-2.5 py-1 font-mono text-[11px]">
                    {keyword}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
