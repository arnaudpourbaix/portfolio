import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experience } from "@/components/sections/experience";
import { Expertise } from "@/components/sections/expertise";
import { Hero } from "@/components/sections/hero";
import { Skills } from "@/components/sections/skills";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
