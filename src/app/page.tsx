import { FloatingNav } from "@/components/floating-nav";
import { LoadingIntro } from "@/components/loading-intro";
import { CustomCursor } from "@/components/custom-cursor";
import { Hero } from "@/components/sections/hero";
import { MotionWords } from "@/components/sections/motion-words";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Journey } from "@/components/sections/journey";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="grain-overlay" aria-hidden />
      <LoadingIntro />
      <CustomCursor />
      <FloatingNav />
      <main className="flex-1">
        <Hero />
        <MotionWords />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
