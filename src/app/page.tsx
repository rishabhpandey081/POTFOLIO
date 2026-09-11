import { FloatingNav } from "@/components/floating-nav";
import { CustomCursor } from "@/components/custom-cursor";
import { Hero } from "@/components/sections/hero";
import { MotionWords } from "@/components/sections/motion-words";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { ProjectShowcase } from "@/components/sections/project-showcase";
import { Journey } from "@/components/sections/journey";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

// Force the page to be fully static — no SSR on each request.
// This prevents the server from crashing under repeated request load.
export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="grain-overlay" aria-hidden />
      <CustomCursor />
      <FloatingNav />
      <main className="flex-1">
        <Hero />
        <MotionWords />
        <About />
        <Skills />
        <ProjectShowcase />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
