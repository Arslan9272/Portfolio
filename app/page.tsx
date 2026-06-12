import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        {/* Section stubs — filled in by the remaining build tasks. */}
        <section id="projects" aria-label="Projects" />
        <section id="experience" aria-label="Experience" />
        <section id="contact" aria-label="Contact" />
      </main>
    </>
  );
}
