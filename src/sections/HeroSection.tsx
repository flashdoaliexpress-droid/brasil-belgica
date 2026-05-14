export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-bottom"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,21,88,0.05) 0%, rgba(26,21,88,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-container-padding-mobile md:px-container-padding-desktop max-w-4xl mx-auto mt-20">
        <img
          src="/images/logo-hero.png"
          alt="Brasil Bélgica F.C."
          className="w-72 md:w-96 h-auto mb-3 drop-shadow-2xl"
          loading="eager"
        />

        <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-secondary-fixed drop-shadow-lg uppercase">
          FUTEBOL, RAÍZES, BRUXELAS.
        </h1>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce-arrow">
        <span
          className="material-symbols-outlined text-secondary-fixed opacity-80"
          style={{ fontSize: 36 }}
        >
          expand_more
        </span>
      </div>
    </section>
  );
}
