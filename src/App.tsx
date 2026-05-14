import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { PlayersSection } from "./sections/PlayersSection";
import { SponsorsSection } from "./sections/SponsorsSection";

type SectionId = "hero" | "sobre" | "jogadores" | "patrocinadores";

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  const handleNavigate = useCallback((id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const sections: SectionId[] = ["hero", "sobre", "jogadores", "patrocinadores"];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
            setActiveSection(entry.target.id as SectionId);
          }
        }
      },
      { threshold: [0.45] }
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-primary-container text-on-background min-h-screen">
      <Navbar active={activeSection} onNavigate={handleNavigate} />
      <main>
        <HeroSection />
        <AboutSection />
        <PlayersSection />
        <SponsorsSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
