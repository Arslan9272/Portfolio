import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <Hero />
        {/* Section stubs — filled in by the remaining build tasks. */}
        <section id="about" aria-label="About" />
        <section id="skills" aria-label="Skills" />
        <section id="projects" aria-label="Projects" />
        <section id="experience" aria-label="Experience" />
        <section id="contact" aria-label="Contact" />
      </main>
    </>
  );
}
