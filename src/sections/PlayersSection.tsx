import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PlayerCard } from "../components/PlayerCard";
import { players } from "../data/players";
import { useLocalStorage } from "../hooks/useLocalStorage";

const STORAGE_KEY = "bb_carousel_index";

export function PlayersSection() {
  const [storedIndex, setStoredIndex] = useLocalStorage<number>(STORAGE_KEY, 0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(storedIndex);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.scrollTo(storedIndex, true);
    const onSelect = () => {
      const i = emblaApi.selectedScrollSnap();
      setSelectedIndex(i);
      setStoredIndex(i);
    };
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, storedIndex, setStoredIndex]);

  return (
    <section
      id="jogadores"
      className="relative min-h-screen pt-32 pb-section-gap overflow-hidden"
      style={{
        backgroundImage: "url('/images/players-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-[#1a1558]/70" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop relative z-10">
        <div className="mb-12">
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase flex flex-col leading-none">
            <span className="text-white">NOSSOS</span>
            <span className="text-secondary-fixed">JOGADORES</span>
          </h2>
        </div>

        <div className="relative w-full">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 pb-8 pt-4">
              {players.map((player, i) => (
                <PlayerCard key={player.id} player={player} active={i === selectedIndex} />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2" role="tablist" aria-label="Selecionar jogador">
              {players.map((p, i) => {
                const isActive = i === selectedIndex;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`Ver ${p.name}`}
                    onClick={() => scrollTo(i)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      isActive
                        ? "bg-secondary-fixed shadow-[0_0_8px_rgba(253,222,0,0.8)]"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={scrollPrev}
                aria-label="Jogador anterior"
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1a1558] transition-colors bg-white/5 backdrop-blur-md"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <button
                type="button"
                onClick={scrollNext}
                aria-label="Próximo jogador"
                className="w-12 h-12 rounded-full border border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1a1558] transition-colors bg-white/5 backdrop-blur-md"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
