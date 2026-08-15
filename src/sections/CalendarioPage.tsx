import { useEffect, useMemo, useState } from "react";
import { CompetitionMatchBlock } from "../components/CompetitionMatchBlock";
import { useMatches } from "../hooks/useMatches";
import { useLanguage } from "../i18n/LanguageContext";
import { classifyMatch, groupMatchesByCompetition, localIsoDate, type MatchCategory } from "../lib/matches";

type Filter = "all" | MatchCategory;

export function CalendarioPage({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const { matches, loading, error } = useMatches();
  const [filter, setFilter] = useState<Filter>("all");
  const today = localIsoDate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const defaultTitle = document.title;
    document.title = `${t.calendar.pageTitle} — Brasil Bélgica F.C.`;

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    if (canonical) canonical.href = `${window.location.origin}/calendario`;

    return () => {
      document.title = defaultTitle;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
    };
  }, [t.calendar.pageTitle]);

  const filtered = useMemo(
    () => matches.filter((match) => filter === "all" || classifyMatch(match) === filter),
    [filter, matches]
  );
  const groups = useMemo(
    () => groupMatchesByCompetition(filtered, t.calendar.filters.friendly, today),
    [filtered, t.calendar.filters.friendly, today]
  );

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: t.calendar.filters.all },
    { id: "league", label: t.calendar.filters.league },
    { id: "cup", label: t.calendar.filters.cup },
    { id: "friendly", label: t.calendar.filters.friendly },
    { id: "tournament", label: t.calendar.filters.tournament },
  ];

  return (
    <main className="bg-page-alt min-h-screen pt-28 pb-section-gap">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 text-[11px] font-bold text-brand-navy uppercase tracking-widest mb-10 hover:text-ink transition-colors group"
        >
          <span className="material-symbols-outlined group-hover:-translate-x-1 transition-transform">arrow_back</span>
          {t.calendar.backToSite}
        </button>

        <header className="mb-10 max-w-3xl">
          <div className="space-y-1.5 mb-4">
            <div className="w-12 h-[3px] bg-[#0120F9]" />
            <div className="w-7 h-[2px] bg-brand-yellow" />
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-ink uppercase leading-none">
            {t.calendar.pageTitle}
          </h1>
          <p className="text-sm text-stone mt-6">{t.calendar.pageSubtitle}</p>
          <p className="text-[10px] text-dust uppercase tracking-wider mt-3">{t.calendar.sourceNote}</p>
        </header>

        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 mb-10" role="tablist" aria-label={t.calendar.filterLabel}>
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={`flex-shrink-0 px-4 py-2 border text-[10px] font-bold uppercase tracking-widest transition-colors ${
                filter === item.id
                  ? "bg-brand-navy border-brand-navy text-white"
                  : "bg-white border-hairline text-stone hover:border-brand-navy/40 hover:text-brand-navy"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {loading && <p className="text-sm text-stone">{t.calendar.loading}</p>}
        {error && <p className="text-sm text-brand-red">{t.calendar.error}</p>}

        {!loading && !error && (
          <div className="space-y-14">
            {groups.map((group) => <CompetitionMatchBlock key={group.key} group={group} />)}
            {groups.length === 0 && <p className="text-sm text-stone">{t.calendar.emptyFilter}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
