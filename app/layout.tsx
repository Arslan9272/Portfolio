import type { Metadata } from "next";
import { Sora, Inter, Alex_Brush } from "next/font/google";
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

// Signature script for the name plate on the hero portrait. Single-weight face.
const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  weight: "400",
  subsets: ["latin"],
});

const TITLE = "Muhammad Arslan Tabish | Full Stack Software Engineer";
const DESCRIPTION =
  "Full stack software engineer in Lahore with 3 years of experience and 30+ projects shipped. Python, FastAPI, PostgreSQL, React and TypeScript, and the AI features inside them.";

const SITE_URL = "https://arslantabish.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: SITE_URL,
    siteName: TITLE,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} ${alexBrush.variable}`}
      data-theme="dark"
    >
      <body className="min-h-screen antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
