import { Masthead } from "@/components/masthead";
import { Hero } from "@/components/sections/hero";
import { MotionWords } from "@/components/sections/motion-words";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Journey } from "@/components/sections/journey";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { CustomCursor } from "@/components/custom-cursor";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="grain-overlay" aria-hidden />
      <CustomCursor />
      <Masthead>
        <Hero />
        <MotionWords />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
        <Footer />
      </Masthead>
    </div>
  );
}
