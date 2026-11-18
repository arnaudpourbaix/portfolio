"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1600;

function format(value: number, decimals: number, locale: string) {
  return value.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Chiffre qui défile jusqu'à sa valeur quand il entre à l'écran ; la valeur finale s'affiche sans JavaScript ou si le visiteur réduit les animations. */
export function Counter({
  value,
  locale,
  decimals = 0,
  prefix = "",
  suffix = "",
}: {
  value: number;
  /** Locale de formatage (« fr-FR » : 80 000, « en-GB » : 80,000). */
  locale: string;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    // Déclenché dès le premier pixel : la carte qui le porte est encore transparente (Reveal), le retour à zéro ne se voit pas.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / DURATION_MS);
        setCurrent(value * (1 - (1 - progress) ** 3));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      setCurrent(0);
      frame = requestAnimationFrame(tick);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {format(current, decimals, locale)}
      {suffix}
    </span>
  );
}
