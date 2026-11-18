// Source HTML du CV téléchargeable : scripts/build-cv.mjs l'imprime en PDF A4 (npm run cv).
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import avatar from "@/content/resume/assets/avatar.png";
import site from "@/content/resume/data/site.json";
import { settings } from "@/content/settings";
import { isLang } from "@/lib/i18n";
import { getAbout, getEducation, getExperiences, getLanguages, getSkills } from "@/lib/resume";

const UI = {
  fr: { skills: "Compétences", education: "Formation", experiences: "Expériences" },
  en: { skills: "Skills", education: "Education", experiences: "Experience" },
};

export const metadata: Metadata = {
  title: `${site.name} — CV`,
};

export default async function CvPage({ params }: PageProps<"/cv/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const ui = UI[lang];
  const about = getAbout(lang);
  const languages = getLanguages(lang);
  const experience = about.figures[0];

  return (
    <>
      <header className="head">
        <div>
          <h1>{site.name}</h1>
          <p className="role">{site.title[lang]}</p>
          <ul className="contact">
            <li>{site.phone}</li>
            <li>{site.email}</li>
            <li>{site.location}</li>
            {experience && (
              <li>
                {experience.raw} {experience.label}
              </li>
            )}
            {about.availability && <li>{about.availability}</li>}
          </ul>
        </div>
        <Image src={avatar} alt="" width={240} height={240} className="photo" loading="eager" />
      </header>

      <section>
        <h2>{about.title}</h2>
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section>
        <h2>{ui.skills}</h2>
        <dl className="skills">
          {getSkills(lang).map((group) => (
            <div key={group.family} style={{ display: "contents" }}>
              <dt>{group.family}</dt>
              <dd>{group.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2>{ui.education}</h2>
        {getEducation(lang).map((education) => (
          <div key={education.title} className="line">
            <div>
              <h3>{education.organization}</h3>
              {education.title}
            </div>
            <span>{education.year}</span>
          </div>
        ))}
      </section>

      <section>
        <h2>{languages.title}</h2>
        {languages.languages.map((language) => (
          <div key={language.name} className="line">
            <span>{language.name}</span>
            <span>{language.level}</span>
          </div>
        ))}
      </section>

      <section className="experiences">
        <h2>{ui.experiences}</h2>
        {getExperiences(lang).map((job) => (
          <article key={`${job.company}-${job.period}`} className="job">
            <div className="job-head">
              <div className="line">
                <h3>
                  {job.company}
                  {settings.showEmployer.cv && job.employer && ` (via ${job.employer})`}
                </h3>
                <span>{job.period}</span>
              </div>
              <div className="line">
                <span className="title">{job.title}</span>
                <span className="muted">{job.location}</span>
              </div>
              <p className="context">{job.context}</p>
            </div>
            {job.business.length > 0 && (
              <ul>
                {job.business.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
            {job.tasks.some((task) => typeof task === "string") && (
              <ul>
                {job.tasks
                  .filter((task) => typeof task === "string")
                  .map((item) => (
                    <li key={item}>{item}</li>
                  ))}
              </ul>
            )}
            {job.tasks
              .filter((task) => typeof task !== "string")
              .map((group) => (
                <div key={group.title} className="task-group">
                  <p className="group">{group.title}</p>
                  {group.description && <p>{group.description}</p>}
                  <ul>
                    {group.tasks.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            {job.stack.length > 0 && <p className="tech">{job.stack.join(", ")}</p>}
          </article>
        ))}
      </section>
    </>
  );
}
