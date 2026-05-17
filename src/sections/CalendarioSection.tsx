import { matches } from "../data/matches";
import type { Match } from "../types";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../i18n/LanguageContext";
import bbeLogo from "../assets/Logo header scroll  - logo pro calendario.png";

function formatDate(iso: string, months: string[], weekdays: string[]) {
  const d = new Date(iso + "T12:00:00");
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: months[d.getMonth()],
    weekday: weekdays[d.getDay()],
  };
}

function StatusBadge({ status, labels }: { status: Match["status"]; labels: { live: string; finished: string; next: string } }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-brand-navy uppercase">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-navy animate-pulse" /> {labels.live}
      </span>
    );
  }
  if (status === "finished") {
    return (
      <span className="inline-flex items-center text-[11px] font-bold tracking-wider text-dust">
        {labels.finished}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center text-[11px] font-bold tracking-wider text-brand-navy">
      {labels.next}
    </span>
  );
}

function MatchCard({ match, months, weekdays, ourTeamLabel, statusLabels }: {
  match: Match;
  months: string[];
  weekdays: string[];
  ourTeamLabel: string;
  statusLabels: { live: string; finished: string; next: string };
}) {
  const date = formatDate(match.date, months, weekdays);
  const isUs = (short: string) => short === "BBE";
  const finished = match.status === "finished";

  return (
    <article className="bg-white border border-hairline overflow-hidden hover:border-[#0120F9]/25 hover:shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between px-5 py-3 border-b border-hairline">
        <div className="flex items-center gap-3 min-w-0">
          <StatusBadge status={match.status} labels={statusLabels} />
          <span className="text-[11px] font-medium text-dust tracking-wide truncate hidden sm:inline">
            {match.competition}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-ink flex-shrink-0">
          <span className="text-xl font-bold">{date.day}</span>
          <div className="flex flex-col leading-tight">
            <span className="text-[10px] font-semibold uppercase text-brand-navy">{date.month}</span>
            <span className="text-[10px] text-dust">{date.weekday}</span>
          </div>
        </div>
      </div>

      <div className="px-5 py-5 space-y-4">
        {[match.home, match.away].map((team, i) => {
          const isOurs = isUs(team.short);
          return (
            <div key={i} className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {isOurs ? (
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-white border border-hairline">
                    <img src={bbeLogo} alt="Brasil" className="w-8 h-8 object-contain" />
                  </div>
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center text-[11px] font-bold flex-shrink-0 bg-stone/10 text-stone">
                    {team.short}
                  </div>
                )}
                <div className="min-w-0">
                  <p className={`text-sm font-semibold truncate ${isOurs ? "text-brand-navy" : "text-ink"}`}>
                    {team.name}
                  </p>
                  {isOurs && (
                    <p className="text-[10px] text-dust tracking-wide">{ourTeamLabel}</p>
                  )}
                </div>
              </div>
              {finished ? (
                <span className="text-lg font-bold text-ink">{team.score}</span>
              ) : (
                <span className="text-sm text-dust">{match.time}</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="px-5 py-3 border-t border-hairline flex items-center gap-2 text-dust">
        <span className="material-symbols-outlined text-base">place</span>
        <span className="text-xs truncate">{match.venue}</span>
      </div>
    </article>
  );
}

export function CalendarioSection() {
  const { t } = useLanguage();
  const upcoming = matches.filter((m) => m.status !== "finished");
  const finished = matches.filter((m) => m.status === "finished");
  const { ref: titleRef, inView: titleVisible } = useInView();
  const statusLabels = { live: t.calendar.live, finished: t.calendar.finished, next: t.calendar.next };

  return (
    <section id="calendario" className="bg-page-alt w-full py-section-gap">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <div
          ref={titleRef}
          className={`mb-12 transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
        >
          <div className="space-y-1.5 mb-4">
            <div className="w-12 h-[3px] bg-[#0120F9]" />
            <div className="w-7 h-[2px] bg-brand-yellow" />
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-ink uppercase leading-none">
            {t.calendar.title}
          </h2>
          <div className="space-y-1.5 mt-4 mb-6">
            <div className="w-7 h-[2px] bg-brand-yellow" />
            <div className="w-12 h-[3px] bg-[#0120F9]" />
          </div>
          <p className="text-sm text-stone max-w-2xl">
            {t.calendar.subtitle}
          </p>
        </div>

        {upcoming.length > 0 && (
          <div className="mb-12">
            <h3 className="text-[11px] font-bold text-brand-navy uppercase tracking-widest mb-6">
              {t.calendar.upcoming}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {upcoming.map((m) => (
                <MatchCard key={m.id} match={m} months={t.calendar.months} weekdays={t.calendar.weekdays} ourTeamLabel={t.calendar.ourTeam} statusLabels={statusLabels} />
              ))}
            </div>
          </div>
        )}

        {finished.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold text-dust uppercase tracking-widest mb-6">
              {t.calendar.results}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {finished.map((m) => (
                <MatchCard key={m.id} match={m} months={t.calendar.months} weekdays={t.calendar.weekdays} ourTeamLabel={t.calendar.ourTeam} statusLabels={statusLabels} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
