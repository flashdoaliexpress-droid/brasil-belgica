import MatchTimelineBlock from "../components/MatchTimelineBlock";
import { useMatches } from "../hooks/useMatches";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../i18n/LanguageContext";
import { localIsoDate, splitMatchesByTimeline } from "../lib/matches";

export function CalendarioSection({ onOpenAll }: { onOpenAll: () => void }) {
  const { t } = useLanguage();
  const { matches, loading, error } = useMatches();
  const { ref: titleRef, inView: titleVisible } = useInView();
  const today = localIsoDate();
  const timeline = splitMatchesByTimeline(matches, today);
  const labels = {
    win: t.calendar.win,
    draw: t.calendar.draw,
    loss: t.calendar.loss,
    awaiting: t.calendar.awaiting,
    venue: t.calendar.venue,
  };
  const visibleCount =
    timeline.upcoming.length + timeline.pending.length + timeline.finished.length;

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
          <p className="text-sm text-stone max-w-2xl">{t.calendar.subtitle}</p>
        </div>

        {loading && <p className="text-sm text-stone">{t.calendar.loading}</p>}
        {error && <p className="text-sm text-brand-red">{t.calendar.error}</p>}

        {!loading && !error && (
          <>
            <div className="space-y-14">
              <MatchTimelineBlock
                title={t.calendar.upcoming}
                matches={timeline.upcoming.slice(0, 3)}
                months={t.calendar.months}
                weekdays={t.calendar.weekdays}
                labels={labels}
              />
              <MatchTimelineBlock
                title={t.calendar.awaitingSection}
                matches={timeline.pending.slice(0, 3)}
                months={t.calendar.months}
                weekdays={t.calendar.weekdays}
                labels={labels}
                awaitingUpdate
              />
              <MatchTimelineBlock
                title={t.calendar.results}
                matches={timeline.finished.slice(0, 3)}
                months={t.calendar.months}
                weekdays={t.calendar.weekdays}
                labels={labels}
              />
            </div>

            {visibleCount === 0 && (
              <p className="text-sm text-stone">{t.calendar.empty}</p>
            )}

            <div className="flex justify-center mt-10">
              <button
                type="button"
                onClick={onOpenAll}
                className="inline-flex items-center gap-2 bg-brand-navy text-white px-6 py-3 text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
              >
                {t.calendar.seeAll}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
