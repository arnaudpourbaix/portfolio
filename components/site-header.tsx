"use client";

import { useState } from "react";
import { profile } from "@/content/profile";
import { CloseIcon, MailIcon, MenuIcon } from "./icons";

const LINKS = [
  { href: "#about", label: "À propos" },
  { href: "#expertise", label: "Expertises" },
  { href: "#skills", label: "Compétences" },
  { href: "#experience", label: "Parcours" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-[15px] font-bold tracking-tight">
          <span aria-hidden="true" className="flex size-7 items-center justify-center rounded-lg bg-primary font-mono text-xs text-primary-foreground">
            AP
          </span>
          {profile.fullName}
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-7 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-muted transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-card-hover sm:inline-flex"
          >
            <MailIcon /> Me contacter
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="rounded-lg p-2 md:hidden"
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Navigation mobile" className="border-t border-border px-4 pb-4 md:hidden">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-3 text-[15px] font-medium">
              {link.label}
            </a>
          ))}
          <a href={`mailto:${profile.email}`} className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
            <MailIcon /> Me contacter
          </a>
        </nav>
      )}
    </header>
  );
}
