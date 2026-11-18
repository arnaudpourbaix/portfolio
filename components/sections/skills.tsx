import { ui } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { getSkills } from "@/lib/resume";
import { Reveal } from "../reveal";
import { CARD, Section } from "../section";

export function Skills({ lang }: { lang: Lang }) {
  const t = ui[lang].skills;
  return (
    <Section id="skills" eyebrow={t.eyebrow} title={t.title}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {getSkills(lang).map((group, i) => (
          <Reveal key={group.family} delay={(i % 3) * 90}>
            <div className={`${CARD} h-full p-6`}>
              <h3 className="text-base font-bold">{group.family}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full bg-background px-3 py-1 font-mono text-[12px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
