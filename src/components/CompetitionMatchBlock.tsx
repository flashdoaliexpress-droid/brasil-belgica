import { MatchCard } from "./MatchCard";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../i18n/LanguageContext";
import { localIsoDate, type CompetitionMatchGroup } from "../lib/matches";

export function CompetitionMatchBlock({ group }: { group: CompetitionMatchGroup }) {
  const { t } = useLanguage();
  const { ref, inView } = useInView();
  const today = localIsoDate();
  const labels = {
    win: t.calendar.win,
    draw: t.calendar.draw,
    loss: t.calendar.loss,
    awaiting: t.calendar.awaiting,
    venue: t.calendar.venue,
  };
  const categoryLabel = t.calendar.filters[group.category];

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
      aria-labelledby={`competition-${group.key.replace(/[^a-zA-Z0-9]/g, "-")}`}
    >
      <header className="flex items-end gap-4 mb-5">
        <div className="min-w-0">
          <p className="text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-1">
            {categoryLabel}
          </p>
          <h3
            id={`competition-${group.key.replace(/[^a-zA-Z0-9]/g, "-")}`}
            className="font-headline-sm text-headline-sm md:font-headline-md md:text-headline-md text-ink uppercase leading-none"
          >
            {group.name}
          </h3>
        </div>
        <div className="hidden sm:block flex-1 h-px bg-hairline mb-1" aria-hidden="true" />
        <span className="hidden sm:inline text-[10px] font-bold text-dust uppercase tracking-widest flex-shrink-0 mb-0.5">
          {group.matches.length}
        </span>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {group.matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            months={t.calendar.months}
            weekdays={t.calendar.weekdays}
            labels={labels}
            awaitingUpdate={match.status !== "finished" && match.date < today}
          />
        ))}
      </div>
    </section>
  );
}
