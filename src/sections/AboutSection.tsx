import sobreNos from "../assets/SOBRE NÓS.png";
import { aboutParagraphs } from "../data/club";
import { useInView } from "../hooks/useInView";

function TitleBars({ dark = false }: { dark?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className={`w-12 h-[3px] ${dark ? "bg-[#0120F9]" : "bg-[#0120F9]"}`} />
      <div className="w-7 h-[2px] bg-brand-yellow" />
    </div>
  );
}

function TitleBarsBottom({ dark = false }: { dark?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="w-7 h-[2px] bg-brand-yellow" />
      <div className={`w-12 h-[3px] ${dark ? "bg-[#0120F9]" : "bg-[#0120F9]"}`} />
    </div>
  );
}

export { TitleBars, TitleBarsBottom };

export function AboutSection() {
  const { ref: headingRef, inView: headingVisible } = useInView();
  const { ref: textRef, inView: textVisible } = useInView();
  const { ref: imgRef, inView: imgVisible } = useInView();

  return (
    <section id="sobre" className="bg-page w-full">
      <div className="relative w-full pt-32 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap">
          <div className="md:col-span-7 flex flex-col justify-center">
            <div
              ref={headingRef}
              className={`transition-all duration-700 ${headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
            >
              <TitleBars />
              <h2
                className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-ink uppercase leading-none my-4"
              >
                NOSSA{" "}
                <span className="text-[#0120F9]">HISTÓRIA</span>
              </h2>
              <TitleBarsBottom />
            </div>

            <div
              ref={textRef}
              className={`font-body-lg text-body-lg text-stone space-y-6 transition-all duration-700 delay-150 mt-8 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
            >
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>

          <div
            ref={imgRef}
            className={`md:col-span-5 flex items-center justify-center mt-8 md:mt-0 transition-all duration-700 delay-200 ${imgVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            <div className="relative w-full flex items-center justify-center">
              <img
                src={sobreNos}
                alt="Escudo Brasil Bélgica"
                className="w-full max-w-sm h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
