import { experiences } from "@/content/experience";
import { Reveal } from "../reveal";
import { CARD, Section } from "../section";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Parcours" title="Vingt-cinq ans de projets, de PL/SQL à TypeScript">
      <ol className="relative space-y-6 before:absolute before:inset-y-2 before:left-[7px] before:w-0.5 before:rounded-full before:bg-accent sm:space-y-8">
        {experiences.map((job, i) => (
          <li key={`${job.company}-${job.period}`} className="relative pl-8 sm:pl-12">
            <span aria-hidden="true" className={`absolute top-7 left-0 size-4 rounded-full border-4 border-background ${i === 0 ? "bg-primary" : "bg-accent"}`} />
            <Reveal>
              <article className={`${CARD} p-5 sm:p-7`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-xl font-bold tracking-tight">
                    {job.company}
                    {job.context && <span className="font-medium text-muted"> · {job.context}</span>}
                  </h3>
                  <p className="font-mono text-xs text-muted">{job.period}</p>
                </div>
                <p className="mt-1 font-semibold text-primary">
                  {job.role}
                  {job.place && <span className="font-normal text-muted"> · {job.place}</span>}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{job.summary}</p>
                {job.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1.5 text-[15px] leading-relaxed">
                    {job.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2.5">
                        <span aria-hidden="true" className="mt-2.5 h-0.5 w-3 shrink-0 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {job.stack.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
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
