import { useCallback, useEffect, useState } from "react";
import { LanguageProvider } from "./i18n/LanguageContext";
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
import { CalendarioPage } from "./sections/CalendarioPage";
import { parseLocation, pushRoute } from "./lib/nav";
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

type View = "home" | "noticias" | "apresentacoes" | "calendario";

const initialRoute = parseLocation(window.location.pathname);

function App() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [view, setView] = useState<View>(initialRoute.view);
  const [openNewsSlug, setOpenNewsSlug] = useState<string | null>(
    initialRoute.view === "noticias" ? initialRoute.slug : null
  );

  const handleNavigate = useCallback((id: SectionId) => {
    if (view !== "home") {
      setView("home");
      setOpenNewsSlug(null);
      pushRoute({ view: "home" });
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [view]);

  // Fonte única de verdade do slug de notícia aberto (evita desync com o histórico).
  const selectNews = useCallback((slug: string | null) => {
    setOpenNewsSlug(slug);
    setView("noticias");
    pushRoute({ view: "noticias", slug });
  }, []);

  const openAllNews = useCallback(() => selectNews(null), [selectNews]);
  const openNewsItem = useCallback((slug: string) => selectNews(slug), [selectNews]);

  const closeNews = useCallback(() => {
    setView("home");
    setOpenNewsSlug(null);
    pushRoute({ view: "home" });
    requestAnimationFrame(() => {
      const el = document.getElementById("noticias");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const openAllApresentacoes = useCallback(() => {
    setView("apresentacoes");
    pushRoute({ view: "apresentacoes" });
  }, []);

  const closeApresentacoes = useCallback(() => {
    setView("home");
    pushRoute({ view: "home" });
    requestAnimationFrame(() => {
      const el = document.getElementById("entrevistas");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const openCalendar = useCallback(() => {
    setView("calendario");
    setOpenNewsSlug(null);
    pushRoute({ view: "calendario" });
  }, []);

  const closeCalendar = useCallback(() => {
    setView("home");
    pushRoute({ view: "home" });
    requestAnimationFrame(() => {
      const el = document.getElementById("calendario");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  // Sincroniza o estado quando o usuário usa voltar/avançar do navegador.
  useEffect(() => {
    const onPopState = () => {
      const route = parseLocation(window.location.pathname);
      setView(route.view);
      setOpenNewsSlug(route.view === "noticias" ? route.slug : null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
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
    <LanguageProvider>
    <div className="bg-page text-ink min-h-screen">
      <Navbar
        active={activeSection}
        onNavigate={handleNavigate}
        onOpenApresentacoes={openAllApresentacoes}
        solid={view !== "home"}
      />
      {view === "home" ? (
        <main>
          <HeroSection />
          <AboutSection />
          <CalendarioSection onOpenAll={openCalendar} />
          <PlayersSection />
          <InterviewsSection onOpenAll={openAllApresentacoes} />
          <NoticiasSection onOpenAll={openAllNews} onOpenItem={openNewsItem} />
          <TitulosSection />
          <LigaSection />
          <ComissaoSection />
          <SponsorsSection />
        </main>
      ) : view === "noticias" ? (
        <NoticiasPage onClose={closeNews} slug={openNewsSlug} onSelect={selectNews} />
      ) : view === "apresentacoes" ? (
        <ApresentacoesPage onClose={closeApresentacoes} />
      ) : (
        <CalendarioPage onClose={closeCalendar} />
      )}
      <Footer />
    </div>
    </LanguageProvider>
  );
}

export default App;
