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

/**
 * Applies the stored theme while the browser parses the HTML, before first
 * paint, so a light-theme visitor never sees a dark flash. Dark is the
 * default and lives on bare :root, so we only ever add the light attribute.
 * See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
 */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="light"){document.documentElement.setAttribute("data-theme","light");document.documentElement.style.colorScheme="light"}else{document.documentElement.style.colorScheme="dark"}}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-screen antialiased">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
