import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arslan — Full Stack Developer",
  description:
    "Full-stack developer building with React, Next.js, and Python — and shipping AI/ML and computer-vision systems to production.",
  openGraph: {
    title: "Arslan — Full Stack Developer",
    description:
      "Full-stack developer building with React, Next.js, and Python — and shipping AI/ML and computer-vision systems to production.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased bg-[var(--bg)] text-[var(--fg)]">
        {children}
      </body>
    </html>
  );
}
