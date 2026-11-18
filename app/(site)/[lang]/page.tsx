import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Expertise } from "@/components/sections/expertise";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";
import { ui } from "@/content/ui";
import { isLang } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <>
      <SiteHeader t={ui[lang].header} nav={ui[lang].nav} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Expertise lang={lang} />
        <Skills lang={lang} />
        <Experience lang={lang} />
        <Contact lang={lang} />
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
