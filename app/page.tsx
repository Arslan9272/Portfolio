import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Projects />
        {/* Section stubs — filled in by the remaining build tasks. */}
        <section id="experience" aria-label="Experience" />
        <section id="contact" aria-label="Contact" />
      </main>
    </>
  );
}
