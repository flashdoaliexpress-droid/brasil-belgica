import { useState } from "react";
import { useStaff } from "../hooks/useStaff";
import type { StaffMember } from "../types";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../i18n/LanguageContext";
import { imgUrl } from "../lib/imgUrl";

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function StaffDetailCard({ member, roleLabel, bio }: { member: StaffMember; roleLabel: string; bio: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group bg-white border border-hairline hover:border-[#0120F9]/20 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative w-full bg-stone/10">
        {imgError ? (
          <div className="min-h-[260px] flex items-center justify-center bg-brand-navy/5">
            <span className="text-6xl font-bold text-brand-navy/20 leading-none">
              {initials(member.name)}
            </span>
          </div>
        ) : (
          <img
            src={member.photo}
            alt={`${member.name} — ${member.role}`}
            className="w-full h-auto block"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 space-y-1">
          <div className="w-1 h-8 bg-brand-navy" aria-hidden="true" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest mb-1">
            {roleLabel}
          </p>
          <h3 className="font-headline-md text-headline-md text-white uppercase leading-none">
            {member.name}
          </h3>
        </div>
      </div>

      <div className="p-6 border-t border-hairline flex-1">
        <p className="text-sm text-stone leading-relaxed">
          {bio}
        </p>
      </div>
    </article>
  );
}

export function ComissaoSection() {
  const { t } = useLanguage();
  const { staff } = useStaff();
  const { ref: titleRef, inView: titleVisible } = useInView();
  const { ref: gridRef, inView: gridVisible } = useInView();

  return (
    <section id="comissao" className="bg-page w-full py-section-gap">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <div
          ref={titleRef}
          className={`mb-12 max-w-3xl transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
        >
          <div className="space-y-1.5 mb-4">
            <div className="w-12 h-[3px] bg-[#0120F9]" />
            <div className="w-7 h-[2px] bg-brand-yellow" />
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-ink uppercase leading-none">
            {t.comissao.title}
          </h2>
          <div className="space-y-1.5 mt-4 mb-6">
            <div className="w-7 h-[2px] bg-brand-yellow" />
            <div className="w-12 h-[3px] bg-[#0120F9]" />
          </div>
          <p className="text-sm text-stone">
            {t.comissao.subtitle}
          </p>
        </div>

        <div
          ref={gridRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-gutter md:gap-10 transition-all duration-700 delay-150 ${gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
        >
          {staff.map((s) => (
            <StaffDetailCard
              key={s.id}
              member={s}
              roleLabel={t.comissao.roles[s.role] ?? s.role}
              bio={t.comissao.staffBios[s.id] ?? s.bio ?? ""}
            />
          ))}
        </div>

        <div className="mt-12 border-t border-hairline pt-10 max-w-3xl">
          <p className="text-sm text-stone italic">
            "{t.comissao.quote}"
          </p>
          <p className="text-[11px] font-bold text-brand-navy uppercase tracking-widest mt-3">
            {t.comissao.quoteAuthor}
          </p>
        </div>
      </div>
    </section>
  );
}
