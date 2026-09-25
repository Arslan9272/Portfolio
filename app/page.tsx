import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { Intro } from "@/components/fx/Intro";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Credentials } from "@/components/sections/Credentials";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { site } from "@/content/site";

// Structured data so search engines read the page as a person's profile
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  jobTitle: site.role,
  url: "https://arslantabish.com",
  image: "https://arslantabish.com/arslan-portrait.webp",
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  alumniOf: "University of the Punjab",
  worksFor: { "@type": "Organization", name: "Intagleo Systems" },
  sameAs: [site.socials.github, site.socials.linkedin],
  knowsAbout: [
    "Full stack web development",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "React",
    "TypeScript",
    "Next.js",
    "Large language models",
    "Retrieval-augmented generation",
    "AI agents",
  ],
};

/**
 * Section order leads with the toolkit and the work, then where it was done.
 * About sits next to the certifications, so the education inside it and the
 * credentials read as one block, then feedback, and Contact closes. How I
 * work lives inside About rather than in a section of its own.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Intro />
      <ScrollProgress />
      <Nav />
      <main className="relative">
        <Hero />
        <Skills index="02" />
        <Projects index="03" />
        <Experience index="04" />
        <About index="05" />
        <Credentials index="06" />
        <Testimonials index="07" />
        <Contact index="08" />
      </main>
      <Footer />
    </>
  );
}
