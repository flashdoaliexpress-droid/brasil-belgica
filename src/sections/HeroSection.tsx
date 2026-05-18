import logoHero from "../assets/Logo Hero.png";
import heroMobile from "../assets/Fundo Hero Mobile.png";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        {/* Mobile background */}
        <img
          src={heroMobile}
          alt=""
          aria-hidden="true"
          className="md:hidden w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        {/* Desktop background */}
        <img
          src="/images/hero-bg.webp"
          alt=""
          aria-hidden="true"
          className="hidden md:block w-full h-full object-cover object-bottom"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,21,88,0.05) 0%, rgba(26,21,88,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-container-padding-mobile md:px-container-padding-desktop max-w-4xl mx-auto -mt-10">
        <img
          src={logoHero}
          alt="Brasil F.C."
          className="w-56 md:w-72 h-auto mb-3"
          loading="eager"
          fetchPriority="high"
        />
      </div>

    </section>
  );
}
