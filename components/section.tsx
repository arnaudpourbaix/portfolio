import type { ReactNode } from "react";
import { Reveal } from "./reveal";

export function Section({ id, eyebrow, title, intro, children, className = "" }: { id: string; eyebrow: string; title: ReactNode; intro?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mb-10 max-w-2xl sm:mb-14">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-primary">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            {eyebrow}
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-[2.6rem] sm:leading-[1.1]">{title}</h2>
          {intro && <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}

/** Carte blanche à ombre douce ; au survol, l'ombre s'intensifie et se teinte de bleu, sans déplacement. */
export const CARD = "rounded-card bg-surface shadow-card transition-shadow duration-300 hover:shadow-card-hover";
