import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const TITLE = "Muhammad Arslan Tabish — Full Stack AI Engineer";
const DESCRIPTION =
  "Full Stack AI Engineer in Lahore building LLM products end to end — Python/FastAPI services and data models through to React 19 and TypeScript interfaces.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
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
      <body className="min-h-screen antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
