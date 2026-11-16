import Image from "next/image";
import { profile, socials } from "@/content/profile";
import { DownloadIcon, MailIcon, PhoneIcon, PinIcon } from "../icons";
import { Reveal } from "../reveal";
import { CARD, Section } from "../section";

export function Contact() {
  const direct = [
    { href: `mailto:${profile.email}`, label: profile.email, icon: MailIcon },
    { href: profile.phoneHref, label: profile.phone, icon: PhoneIcon },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Parlons de votre <span className="cartouche">projet.</span>
        </>
      }
      intro="Un projet TypeScript à lancer, une refonte ou une équipe à faire monter en qualité ? Écrivez-moi ou appelez-moi."
    >
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-card bg-primary p-8 text-primary-foreground shadow-card-hover">
            <p className="text-3xl font-bold leading-tight tracking-tight">Échangeons sur votre projet.</p>
            <p className="mt-3 max-w-md opacity-90">Par e-mail ou par téléphone, comme vous préférez.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 text-[15px] font-semibold text-primary">
                <MailIcon /> M&apos;écrire
              </a>
              <a href={profile.cv} download className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-[15px] font-semibold transition-colors hover:bg-primary-foreground/10">
                <DownloadIcon /> Mon CV en PDF
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <div className={`${CARD} h-full space-y-1 p-6`}>
            {direct.map((item) => (
              <a key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-2 py-2.5 font-medium transition-colors hover:bg-background hover:text-primary">
                <item.icon className="size-5 text-primary" />
                <span className="break-all">{item.label}</span>
              </a>
            ))}
            <p className="flex items-center gap-3 px-2 py-2.5 text-muted">
              <PinIcon className="size-5 text-primary" /> {profile.location}
            </p>
            <div className="flex flex-wrap gap-2 border-t border-border pt-4">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-background px-3.5 py-2 text-sm font-medium transition-shadow hover:shadow-card"
                >
                  <Image src={social.logo} alt="" width={18} height={18} className="size-[18px]" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
