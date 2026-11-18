import { settings } from "@/content/settings";
import { ui } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { getExperiences, type Task } from "@/lib/resume";
import { Reveal } from "../reveal";
import { CARD, Section } from "../section";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-[15px] leading-relaxed">
      {items.map((item) => (
        <li key={item} className="flex gap-2.5">
          <span aria-hidden="true" className="mt-2.5 h-0.5 w-3 shrink-0 rounded-full bg-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Label({ children }: { children: string }) {
  return <h4 className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{children}</h4>;
}

function Tasks({ tasks }: { tasks: Task[] }) {
  const single = tasks.filter((task) => typeof task === "string");
  const groups = tasks.filter((task) => typeof task !== "string");
  return (
    <>
      {single.length > 0 && <Bullets items={single} />}
      {groups.map((group) => (
        <div key={group.title} className="mt-3">
          <p className="text-[15px] font-semibold">{group.title}</p>
          {group.description && <p className="mt-1 text-[15px] leading-relaxed text-muted">{group.description}</p>}
          <Bullets items={group.tasks} />
        </div>
      ))}
    </>
  );
}

export function Experience({ lang }: { lang: Lang }) {
  const t = ui[lang].experience;
  return (
    <Section id="experience" eyebrow={t.eyebrow} title={t.title}>
      <ol className="relative space-y-6 before:absolute before:inset-y-2 before:left-[7px] before:w-0.5 before:rounded-full before:bg-accent sm:space-y-8">
        {getExperiences(lang).map((job, i) => (
          <li key={`${job.company}-${job.period}`} className="relative pl-8 sm:pl-12">
            <span aria-hidden="true" className={`absolute top-7 left-0 size-4 rounded-full border-4 border-background ${i === 0 ? "bg-primary" : "bg-accent"}`} />
            <Reveal>
              <article className={`${CARD} p-5 sm:p-7`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-bold tracking-tight">
                    {job.company}
                    {job.project && <span className="font-medium text-muted"> · {job.project}</span>}
                    {settings.showEmployer.site && job.employer && (
                      <span className="font-medium text-muted">
                        {" "}
                        · {t.via} {job.employer}
                      </span>
                    )}
                  </h3>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                </div>
                <p className="mt-1 font-semibold text-primary">
                  {job.role}
                  <span className="font-normal text-muted"> · {job.place}</span>
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{job.context}</p>
                {job.business.length > 0 && (
                  <>
                    <Label>{t.business}</Label>
                    <Bullets items={job.business} />
                  </>
                )}
                {job.tasks.length > 0 && (
                  <>
                    <Label>{t.tasks}</Label>
                    <Tasks tasks={job.tasks} />
                  </>
                )}
                {job.stack.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {job.stack.map((tech) => (
                      <li key={tech} className="rounded-full bg-background px-2.5 py-1 font-mono text-[11px]">
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
