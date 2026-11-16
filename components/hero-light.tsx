// Les traînées de lumière et la grille de la bannière LinkedIn, transposées sur fond clair, derrière le hero.
export function HeroLight() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60 mask-[radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]"
        style={{
          backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Fondu vers la gauche : les traînées restent derrière la photo, comme sur la bannière, et ne barrent jamais le texte. */}
      <svg viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full mask-[linear-gradient(90deg,transparent_42%,black_68%)] max-lg:mask-[linear-gradient(180deg,transparent_55%,black_75%)]">
        <defs>
          <linearGradient id="streak" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: "var(--primary)", stopOpacity: 0 }} />
            <stop offset="0.55" style={{ stopColor: "var(--primary)", stopOpacity: 0.55 }} />
            <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0 }} />
          </linearGradient>
          <filter id="streak-blur" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <g filter="url(#streak-blur)" fill="none" strokeLinecap="round">
          <path d="M-100 620 C 300 420, 700 520, 1300 160" stroke="url(#streak)" strokeWidth="26" />
          <path d="M100 700 C 500 520, 850 560, 1300 330" stroke="url(#streak)" strokeWidth="10" opacity="0.7" />
        </g>
        <g fill="none" strokeLinecap="round">
          <path d="M-100 620 C 300 420, 700 520, 1300 160" stroke="url(#streak)" strokeWidth="2.5" />
          <path d="M400 -40 C 650 120, 900 80, 1300 -20" stroke="url(#streak)" strokeWidth="1.5" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
