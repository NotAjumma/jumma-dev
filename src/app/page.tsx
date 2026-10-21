import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { About, Contact, Education, Experience, Footer, Skills } from "@/components/Sections";
import { Projects, Work } from "@/components/Work";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
