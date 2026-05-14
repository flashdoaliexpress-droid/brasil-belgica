import { StaffCard } from "../components/StaffCard";
import { aboutParagraphs, club, staffDescription } from "../data/club";
import { staff } from "../data/staff";

interface StatProps {
  value: string;
  label: string;
}

function StatCard({ value, label }: StatProps) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/15 p-6 flex flex-col items-center justify-center text-center">
      <span className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-secondary-fixed mb-2">
        {value}
      </span>
      <span className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export function AboutSection() {
  return (
    <>
      <section id="sobre" className="bg-[#1a1558] w-full">
        <div className="relative w-full pt-32 pb-section-gap px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-section-gap">
            <div className="md:col-span-7 flex flex-col justify-center">
              <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-white leading-none uppercase mb-8">
                NOSSA
                <br />
                <span className="text-secondary-fixed bicolor-title-bottom pb-2">HISTÓRIA</span>
              </h2>

              <div className="font-body-lg text-body-lg text-inverse-surface space-y-6">
                {aboutParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 flex items-center justify-center mt-8 md:mt-0">
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#1a1558]">
                <img
                  src="/images/about.png"
                  alt="Brasil Bélgica — Jogador em ação"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="mb-section-gap">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-base md:gap-gutter">
              <StatCard value={String(club.founded)} label="Fundação" />
              <StatCard value={club.city} label="Sede" />
              <StatCard value="Amador" label="Nível" />
            </div>
          </div>

          <div>
            <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-white uppercase leading-none mb-12">
              COMISSÃO
              <br />
              <span className="text-secondary-fixed bicolor-title-bottom pb-2">TÉCNICA</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter md:gap-10 mb-10">
              {staff.map((member) => (
                <StaffCard key={member.id} member={member} />
              ))}
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant italic max-w-3xl">
              {staffDescription}
            </p>
          </div>
        </div>
      </section>

      <div className="w-full h-4 bg-gradient-to-r from-secondary-fixed to-brand-green -skew-y-2 my-0" />
    </>
  );
}
