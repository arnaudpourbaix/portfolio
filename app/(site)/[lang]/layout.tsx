import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import { notFound } from "next/navigation";
import { profile } from "@/content/profile";
import { ui } from "@/content/ui";
import { isLang, LANGS } from "@/lib/i18n";
import { getAbout } from "@/lib/resume";
import "../globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const title = `${profile.fullName} | ${profile.title[lang]}`;
  const description = getAbout(lang).pitch;
  return {
    title,
    description,
    alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, `/${l}`])) },
    openGraph: {
      title,
      description,
      locale: ui[lang].meta.locale,
      type: "profile",
      images: [{ url: profile.photo, width: 720, height: 720, alt: profile.fullName }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f3f2ef",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  return (
    <html lang={lang} className={`${interTight.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
