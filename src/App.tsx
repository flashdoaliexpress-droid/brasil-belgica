import { useCallback, useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { CalendarioSection } from "./sections/CalendarioSection";
import { PlayersSection } from "./sections/PlayersSection";
import { InterviewsSection } from "./sections/InterviewsSection";
import { NoticiasSection } from "./sections/NoticiasSection";
import { TitulosSection } from "./sections/TitulosSection";
import { LigaSection } from "./sections/LigaSection";
import { ComissaoSection } from "./sections/ComissaoSection";
import { SponsorsSection } from "./sections/SponsorsSection";
import { NoticiasPage } from "./sections/NoticiasPage";
import { ApresentacoesPage } from "./sections/ApresentacoesPage";
// InstagramSection removido do fluxo principal — código preservado em ./sections/InstagramSection.tsx caso seja reativado.

type SectionId =
  | "hero"
  | "sobre"
  | "calendario"
  | "jogadores"
  | "entrevistas"
  | "noticias"
  | "titulos"
  | "liga"
  | "comissao"
  | "patrocinadores";

type View = "home" | "noticias" | "apresentacoes";

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [view, setView] = useState<View>("home");
  const [openNewsSlug, setOpenNewsSlug] = useState<string | null>(null);

  const handleNavigate = useCallback((id: SectionId) => {
    if (view !== "home") {
      setView("home");
      setOpenNewsSlug(null);
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [view]);

  const openAllNews = useCallback(() => {
    setOpenNewsSlug(null);
    setView("noticias");
  }, []);

  const openNewsItem = useCallback((slug: string) => {
    setOpenNewsSlug(slug);
    setView("noticias");
  }, []);

  const closeNews = useCallback(() => {
    setView("home");
    setOpenNewsSlug(null);
    requestAnimationFrame(() => {
      const el = document.getElementById("noticias");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const openAllApresentacoes = useCallback(() => {
    setView("apresentacoes");
  }, []);

  const closeApresentacoes = useCallback(() => {
    setView("home");
    requestAnimationFrame(() => {
      const el = document.getElementById("entrevistas");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  useEffect(() => {
    if (view !== "home") return;

    const sections: SectionId[] = [
      "hero",
      "sobre",
      "calendario",
      "jogadores",
      "entrevistas",
      "noticias",
      "titulos",
      "liga",
      "comissao",
      "patrocinadores",
    ];
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
  }, [view]);

  return (
    <div className="bg-page text-ink min-h-screen">
      <Navbar active={activeSection} onNavigate={handleNavigate} onOpenApresentacoes={openAllApresentacoes} />
      {view === "home" ? (
        <main>
          <HeroSection />
          <AboutSection />
          <CalendarioSection />
          <PlayersSection />
          <InterviewsSection onOpenAll={openAllApresentacoes} />
          <NoticiasSection onOpenAll={openAllNews} onOpenItem={openNewsItem} />
          <TitulosSection />
          <LigaSection />
          <ComissaoSection />
          <SponsorsSection />
        </main>
      ) : view === "noticias" ? (
        <NoticiasPage onClose={closeNews} initialSlug={openNewsSlug} />
      ) : (
        <ApresentacoesPage onClose={closeApresentacoes} />
      )}
      <Footer />
    </div>
  );
}

export default App;
