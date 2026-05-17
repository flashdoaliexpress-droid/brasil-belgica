import { useEffect, useState } from "react";
import { interviews, type Interview } from "../data/interviews";
import { useLanguage } from "../i18n/LanguageContext";

function VideoModal({ interview, onClose }: { interview: Interview; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Apresentação — ${interview.name}`}
    >
      <div
        className="relative w-full max-w-sm animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute -top-10 right-0 text-white hover:text-secondary-fixed transition-colors"
        >
          <span className="material-symbols-outlined text-4xl">close</span>
        </button>

        <video
          src={interview.video}
          className="w-full h-auto block bg-black"
          controls
          autoPlay
          playsInline
          preload="auto"
        />

        <div className="mt-3 text-center">
          <p className="font-headline-md text-headline-md text-white uppercase leading-none">
            {interview.name}
          </p>
          {interview.position && (
            <p className="text-[11px] font-bold text-secondary-fixed uppercase tracking-widest mt-1">
              {interview.position}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ApresentacaoCard({ interview, onOpen, presentationLabel }: { interview: Interview; onOpen: (i: Interview) => void; presentationLabel: string }) {
  return (
    <div
      className="group cursor-pointer"
      onClick={() => onOpen(interview)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(interview); }}
      aria-label={`Assistir apresentação de ${interview.name}`}
    >
      <div className="relative aspect-[9/16] overflow-hidden bg-stone/10">
        <img
          src={interview.thumbnail}
          alt={interview.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300" />



        <div className="absolute inset-0 border-2 border-[#0120F9]/0 group-hover:border-[#0120F9]/30 transition-colors duration-300" />
      </div>

      <div className="pt-4 border-l-2 border-[#0120F9]/0 group-hover:border-[#0120F9]/40 pl-0 group-hover:pl-3 transition-all duration-300">
        <h3 className="font-headline-md text-headline-md text-ink uppercase leading-none">
          {interview.name}
        </h3>
        {interview.position && (
          <p className="text-[11px] font-bold text-brand-navy uppercase tracking-widest mt-1">
            {interview.position}
          </p>
        )}
        <p className="text-[10px] font-medium text-dust uppercase tracking-widest mt-0.5">
          {presentationLabel}
        </p>
      </div>
    </div>
  );
}

interface Props {
  onClose: () => void;
}

export function ApresentacoesPage({ onClose }: Props) {
  const { t } = useLanguage();
  const [activeVideo, setActiveVideo] = useState<Interview | null>(null);

  return (
    <>
      <div className="bg-page min-h-screen pt-24 pb-section-gap">
        <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-[11px] font-bold text-brand-navy uppercase tracking-widest mb-10 hover:text-ink transition-colors group"
          >
            <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            {t.apresentacoes.backToSite}
          </button>

          <div className="mb-12">
            <div className="space-y-1.5 mb-4">
              <div className="w-12 h-[3px] bg-[#0120F9]" />
              <div className="w-7 h-[2px] bg-brand-yellow" />
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-ink uppercase leading-none">
              {t.apresentacoes.title}
            </h1>
            <div className="space-y-1.5 mt-4 mb-6">
              <div className="w-7 h-[2px] bg-brand-yellow" />
              <div className="w-12 h-[3px] bg-[#0120F9]" />
            </div>
            <p className="text-sm text-stone">
              {interviews.length} {t.apresentacoes.countSuffix}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-gutter md:gap-8">
            {interviews.map((interview) => (
              <ApresentacaoCard
                key={interview.id}
                interview={interview}
                onOpen={setActiveVideo}
                presentationLabel={t.apresentacoes.presentation}
              />
            ))}
          </div>
        </div>
      </div>

      {activeVideo && (
        <VideoModal interview={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
