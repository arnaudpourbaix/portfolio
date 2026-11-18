// Layout racine à part : la page du CV, imprimée en PDF par scripts/build-cv.mjs, ne charge ni Tailwind ni les polices du site.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLang, LANGS } from "@/lib/i18n";
import "./cv.css";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export default async function CvLayout({ children, params }: LayoutProps<"/cv/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
