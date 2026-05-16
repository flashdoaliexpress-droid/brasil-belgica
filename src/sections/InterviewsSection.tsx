import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { interviews, type Interview } from "../data/interviews";

function InterviewModal({ interview, onClose }: { interview: Interview; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Entrevista — ${interview.name}`}
    >
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute -top-10 right-0 text-white hover:text-[#FDDE00] transition-colors"
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

        <p className="mt-3 font-headline-md text-headline-md text-white uppercase text-center tracking-wide">
          {interview.name}
        </p>
      </div>
    </div>
  );
}

interface CardProps {
  interview: Interview;
  isActive: boolean;
  onOpen: (interview: Interview) => void;
}

function InterviewCard({ interview, isActive, onOpen }: CardProps) {
  return (
    <div
      className="w-full cursor-pointer"
      onClick={() => onOpen(interview)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onOpen(interview); }}
      aria-label={`Assistir entrevista de ${interview.name}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={interview.thumbnail}
          alt={`Thumbnail ${interview.name}`}
          loading={isActive ? "eager" : "lazy"}
          className="w-full h-auto block"
        />
        <div className={`absolute inset-0 flex items-center justify-center transition-colors ${isActive ? "bg-black/20 hover:bg-black/40" : "bg-black/50 hover:bg-black/60"}`}>
          <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isActive ? "bg-[#FDDE00] hover:bg-white" : "bg-white/20 hover:bg-[#FDDE00]"}`}>
            <span className="material-symbols-outlined text-[#1a1558] text-4xl">
              play_arrow
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3">
        <p className="font-headline-md text-headline-md text-black uppercase leading-tight">
          {interview.name}
        </p>
        <p className="font-label-md text-label-md text-brand-navy uppercase tracking-widest mt-1">
          Entrevista
        </p>
      </div>
    </div>
  );
}

export function InterviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    dragFree: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [modalInterview, setModalInterview] = useState<Interview | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActiveIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  return (
    <>
      <section id="entrevistas" className="bg-white py-section-gap overflow-hidden">
        <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop mb-12">
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase leading-none text-black">
            ENTREVISTAS
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3 md:gap-5">
              {interviews.map((interview, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={interview.id}
                    className={`flex-shrink-0 w-[72vw] md:w-[38vw] lg:w-[30vw] transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-45"
                    }`}
                  >
                    <InterviewCard
                      interview={interview}
                      isActive={isActive}
                      onOpen={setModalInterview}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
            <p className="font-label-lg text-label-lg text-brand-navy uppercase tracking-widest">
              {activeIndex + 1} de {interviews.length}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Entrevista anterior"
                className="w-12 h-12 flex items-center justify-center border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Próxima entrevista"
                className="w-12 h-12 flex items-center justify-center border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {modalInterview && (
        <InterviewModal
          interview={modalInterview}
          onClose={() => setModalInterview(null)}
        />
      )}
    </>
  );
}
