import { titles } from "../data/titles";
import { useInView } from "../hooks/useInView";

export function TitulosSection() {
  const { ref: titleRef, inView: titleVisible } = useInView();

  return (
    <section id="titulos" className="bg-page w-full py-section-gap">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter md:gap-10">
          <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
            <div
              ref={titleRef}
              className={`transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
            >
              <div className="space-y-1.5 mb-4">
                <div className="w-12 h-[3px] bg-[#0120F9]" />
                <div className="w-7 h-[2px] bg-brand-yellow" />
              </div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-ink uppercase leading-none">
                TÍTULOS &amp; CONQUISTAS
              </h2>
              <div className="space-y-1.5 mt-4 mb-6">
                <div className="w-7 h-[2px] bg-brand-yellow" />
                <div className="w-12 h-[3px] bg-[#0120F9]" />
              </div>

              <p className="text-sm text-stone mb-8 max-w-md">
                A trajetória do Brasil Bélgica se constrói rodada após rodada — cada conquista é uma
                marca da nossa história em Bruxelas.
              </p>

              <span className="material-symbols-outlined text-brand-yellow text-6xl mt-4" style={{ fontSize: "4rem" }}>
                trophy
              </span>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ul className="relative space-y-6">
              <div
                className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-brand-navy/15"
                aria-hidden="true"
              />

              {titles.map((t) => (
                <li key={t.id} className="relative pl-12 md:pl-16 group">
                  <div
                    className="absolute left-1 md:left-2 top-6 w-5 h-5 bg-brand-navy rotate-45 ring-4 ring-page group-hover:scale-125 transition-transform"
                    aria-hidden="true"
                  />

                  <article className="bg-white border border-hairline hover:border-[#0120F9]/25 hover:shadow-sm transition-all duration-300 p-6">
                    <div className="flex flex-wrap items-start gap-x-6 gap-y-3">
                      <p className="text-2xl font-normal text-brand-navy leading-none">
                        {t.year}
                      </p>
                      <div className="min-w-[200px] flex-1">
                        <h3 className="text-base font-semibold text-ink uppercase leading-tight">
                          {t.name}
                        </h3>
                        <p className="text-[11px] font-semibold text-dust uppercase tracking-widest mt-2">
                          {t.competition}
                        </p>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
