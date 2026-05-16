import { useEffect, useState } from "react";
import { interviews, type Interview } from "../data/interviews";
import { useInView } from "../hooks/useInView";

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

function ApresentacaoCard({ interview, index, onOpen }: { interview: Interview; index: number; onOpen: (i: Interview) => void }) {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group cursor-pointer transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
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

      <div className="pt-4 pb-2 border-l-2 border-[#0120F9]/0 group-hover:border-[#0120F9]/40 pl-0 group-hover:pl-3 transition-all duration-300">
        <h3 className="font-headline-md text-headline-md text-ink uppercase leading-none">
          {interview.name}
        </h3>
        {interview.position && (
          <p className="text-[11px] font-bold text-brand-navy uppercase tracking-widest mt-1">
            {interview.position}
          </p>
        )}
        <p className="text-[10px] font-medium text-dust uppercase tracking-widest mt-0.5">
          Apresentação
        </p>
      </div>
    </div>
  );
}

interface Props {
  onOpenAll: () => void;
}

export function InterviewsSection({ onOpenAll }: Props) {
  const [activeVideo, setActiveVideo] = useState<Interview | null>(null);
  const { ref: titleRef, inView: titleVisible } = useInView();

  const featured = interviews.slice(0, 4);

  return (
    <>
      <section id="entrevistas" className="bg-page py-section-gap overflow-hidden">
        <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
          <div
            ref={titleRef}
            className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
          >
            <div>
              <div className="space-y-1.5 mb-4">
                <div className="w-12 h-[3px] bg-[#0120F9]" />
                <div className="w-7 h-[2px] bg-brand-yellow" />
              </div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-ink uppercase leading-none">
                APRESENTAÇÕES DOS JOGADORES
              </h2>
              <div className="space-y-1.5 mt-4">
                <div className="w-7 h-[2px] bg-brand-yellow" />
                <div className="w-12 h-[3px] bg-[#0120F9]" />
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenAll}
              className="mt-6 md:mt-0 self-start md:self-auto flex items-center gap-2 text-[11px] font-bold text-brand-navy hover:text-ink transition-colors uppercase tracking-widest group"
            >
              Ver todas ({interviews.length})
              <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter md:gap-8">
            {featured.map((interview, i) => (
              <ApresentacaoCard
                key={interview.id}
                interview={interview}
                index={i}
                onOpen={setActiveVideo}
              />
            ))}
          </div>
        </div>
      </section>

      {activeVideo && (
        <VideoModal interview={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </>
  );
}
