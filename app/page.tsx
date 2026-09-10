import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Credentials } from "@/components/sections/Credentials";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

/**
 * Section order leads with evidence — the work, then where it was done, then
 * the toolkit and credentials. About sits second-to-last, once the reader has
 * already seen what the claims are backed by, and Contact closes.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <Projects index="01" />
        <Experience index="02" />
        <Skills index="03" />
        <Credentials index="04" />
        <About index="05" />
        <Contact index="06" />
      </main>
      <Footer />
    </>
  );
}
