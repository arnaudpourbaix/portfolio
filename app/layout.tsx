import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter_Tight } from "next/font/google";
import { about, profile } from "@/content/profile";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.fullName} | ${profile.title}`,
  description: about[0],
  openGraph: {
    title: `${profile.fullName} | ${profile.title}`,
    description: about[0],
    locale: "fr_FR",
    type: "profile",
    images: [{ url: profile.photo, width: 720, height: 720, alt: profile.fullName }],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3f2ef",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${interTight.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
