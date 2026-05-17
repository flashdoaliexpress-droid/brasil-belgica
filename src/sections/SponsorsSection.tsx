import { useInView } from "../hooks/useInView";
import { useLanguage } from "../i18n/LanguageContext";

export function SponsorsSection() {
  const { t } = useLanguage();
  const { ref: titleRef, inView: titleVisible } = useInView();

  return (
    <section id="patrocinadores" className="w-full py-section-gap" style={{ backgroundColor: "#1F185F" }}>
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <div
          ref={titleRef}
          className={`mb-12 transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
        >
          <div className="space-y-1.5 mb-4">
            <div className="w-12 h-[3px] bg-[#0120F9]" />
            <div className="w-7 h-[2px] bg-brand-yellow" />
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-white uppercase leading-none text-center md:text-left">
            {t.sponsors.title}
          </h2>
          <div className="space-y-1.5 mt-4 mb-0">
            <div className="w-7 h-[2px] bg-brand-yellow" />
            <div className="w-12 h-[3px] bg-[#0120F9]" />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <img
            src="/images/sponsors.webp"
            alt={t.sponsors.alt}
            className="w-full max-w-4xl h-auto"
            loading="lazy"
          />
        </div>

        <p className="text-sm text-white/70 text-center mt-10 max-w-3xl mx-auto">
          {t.sponsors.description}
        </p>
      </div>
    </section>
  );
}
