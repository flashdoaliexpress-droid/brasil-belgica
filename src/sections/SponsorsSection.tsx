export function SponsorsSection() {
  return (
    <section id="patrocinadores" className="bg-[#1a1558] w-full py-section-gap">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase flex flex-col leading-none mb-12 text-center md:text-left">
          <span className="text-white">PATROCINADORES</span>
          <span className="text-secondary-fixed">PARCEIROS</span>
        </h2>

        <div className="flex items-center justify-center">
          <img
            src="/images/sponsors.png"
            alt="Patrocinadores e parceiros do Brasil Bélgica"
            className="w-full max-w-4xl h-auto"
            loading="lazy"
          />
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant text-center mt-10 max-w-3xl mx-auto">
          Os patrocinadores apoiam o Brasil Bélgica e fazem parte do crescimento do clube,
          fortalecendo o projeto dentro e fora de campo. Com esse apoio, seguimos mais preparados
          para buscar grandes conquistas.
        </p>
      </div>
    </section>
  );
}
