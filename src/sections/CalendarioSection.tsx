import { useMatches } from "../hooks/useMatches";
import type { Match, MatchTeam, Goal } from "../types";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../i18n/LanguageContext";
import bbeLogo from "../assets/Logo header scroll  - logo pro calendario.png";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string, months: string[], weekdays: string[]) {
  const d = new Date(iso + "T12:00:00");
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: months[d.getMonth()],
    weekday: weekdays[d.getDay()],
  };
}

function getBrasilResult(match: Match): "win" | "draw" | "loss" | null {
  if (match.status !== "finished") return null;
  const brasilHome = match.home.short === "BBE";
  const bScore = brasilHome ? (match.home.score ?? 0) : (match.away.score ?? 0);
  const oScore = brasilHome ? (match.away.score ?? 0) : (match.home.score ?? 0);
  if (bScore > oScore) return "win";
  if (bScore === oScore) return "draw";
  return "loss";
}

type TournamentGroup = {
  name: string;
  date: string;
  venue: string;
  matches: Match[];
};

function groupByTournament(allMatches: Match[]): TournamentGroup[] {
  const map = new Map<string, TournamentGroup>();
  for (const m of allMatches) {
    const key = m.tournament ?? m.competition;
    if (!map.has(key)) {
      map.set(key, { name: key, date: m.date, venue: m.venue, matches: [] });
    }
    map.get(key)!.matches.push(m);
  }
  return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TeamLogo({ team }: { team: MatchTeam }) {
  if (team.short === "BBE") {
    return (
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-white border border-hairline rounded-sm overflow-hidden">
        <img src={bbeLogo} alt="Brasil" className="w-8 h-8 object-contain" />
      </div>
    );
  }
  if (team.logo) {
    return (
      <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-white border border-hairline rounded-sm overflow-hidden">
        <img
          src={team.logo}
          alt={team.name}
          className="w-9 h-9 object-contain"
          onError={(e) => {
            const el = e.currentTarget as HTMLImageElement;
            el.style.display = "none";
            el.parentElement!.innerHTML = `<span class="text-[10px] font-bold text-stone">${team.short}</span>`;
          }}
        />
      </div>
    );
  }
  return (
    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-stone/10 border border-hairline rounded-sm">
      <span className="text-[10px] font-bold text-stone">{team.short}</span>
    </div>
  );
}

function GoalsList({ goals }: { goals: Goal[] }) {
  if (!goals || goals.length === 0) return null;
  return (
    <p className="text-[10px] text-dust leading-relaxed mt-0.5 ml-[52px]">
      {goals.map((g, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-1 opacity-40">·</span>}
          <span className="font-semibold text-stone">{g.minute}'</span>{" "}
          {g.player}
          {g.ownGoal && <span className="opacity-60"> (GC)</span>}
        </span>
      ))}
    </p>
  );
}

function ResultBadge({ result }: { result: "win" | "draw" | "loss" | null }) {
  if (!result) return null;
  const cfg = {
    win: { label: "VITÓRIA", cls: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    draw: { label: "EMPATE", cls: "text-stone bg-stone/10 border-stone/20" },
    loss: { label: "DERROTA", cls: "text-brand-red bg-red-50 border-red-200" },
  }[result];
  return (
    <span className={`text-[9px] font-bold tracking-widest px-2 py-0.5 border ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}

function MatchCard({ match, months, weekdays }: {
  match: Match;
  months: string[];
  weekdays: string[];
}) {
  const date = formatDate(match.date, months, weekdays);
  const result = getBrasilResult(match);
  const finished = match.status === "finished";

  return (
    <article className="bg-white border border-hairline overflow-hidden hover:border-brand-navy/20 hover:shadow-sm transition-all duration-300 flex flex-col">
      {/* Card header: horário + badges */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-hairline bg-page/60">
        <div className="flex items-center gap-2 flex-wrap">
          {match.group && (
            <span className="text-[9px] font-bold tracking-widest text-brand-navy uppercase bg-brand-navy/8 px-2 py-0.5 border border-brand-navy/20">
              {match.group}
            </span>
          )}
          {match.phase && (
            <span className="text-[9px] font-bold tracking-widest text-brand-yellow bg-brand-navy px-2 py-0.5">
              {match.phase.toUpperCase()}
            </span>
          )}
          {result && <ResultBadge result={result} />}
        </div>
        <div className="flex items-center gap-1 text-dust flex-shrink-0">
          <span className="material-symbols-outlined text-[13px]">schedule</span>
          <span className="text-[11px] font-semibold">{match.time}</span>
          {!match.group && !match.phase && (
            <span className="text-[10px] text-dust/60 ml-1">
              {date.day} {date.month}
            </span>
          )}
        </div>
      </div>

      {/* Teams + scores */}
      <div className="px-4 py-4 space-y-3 flex-1">
        {[match.home, match.away].map((team, i) => (
          <div key={i}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <TeamLogo team={team} />
                <p className={`text-sm font-semibold truncate ${team.short === "BBE" ? "text-brand-navy" : "text-ink"}`}>
                  {team.name}
                </p>
              </div>
              {finished ? (
                <span className={`text-xl font-bold flex-shrink-0 ${team.short === "BBE" ? "text-brand-navy" : "text-ink"}`}>
                  {team.score}
                </span>
              ) : (
                <span className="text-xs text-dust flex-shrink-0">-</span>
              )}
            </div>
            {finished && team.goals && team.goals.length > 0 && (
              <GoalsList goals={team.goals} />
            )}
          </div>
        ))}
      </div>
    </article>
  );
}

function TournamentBlock({ group, months, weekdays }: {
  group: TournamentGroup;
  months: string[];
  weekdays: string[];
}) {
  const date = formatDate(group.date, months, weekdays);
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
    >
      {/* Tournament header */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-4 mb-5">
        <div>
          <p className="text-[10px] font-bold text-brand-navy uppercase tracking-widest mb-1">
            {date.day} {date.month} · {group.venue}
          </p>
          <h3 className="font-headline-sm text-headline-sm text-ink uppercase leading-none">
            {group.name}
          </h3>
        </div>
        <div className="hidden sm:block flex-1 h-px bg-hairline mb-1" />
        <p className="text-[10px] font-bold text-dust uppercase tracking-widest mb-1 sm:flex-shrink-0">
          {group.matches.length} {group.matches.length === 1 ? "jogo" : "jogos"}
        </p>
      </div>

      {/* Match cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {group.matches.map((m) => (
          <MatchCard key={m.id} match={m} months={months} weekdays={weekdays} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function CalendarioSection() {
  const { t } = useLanguage();
  const { matches } = useMatches();
  const { ref: titleRef, inView: titleVisible } = useInView();

  const upcoming = matches.filter((m) => m.status !== "finished");
  const finished = matches.filter((m) => m.status === "finished");

  const upcomingGroups = groupByTournament(upcoming);
  const finishedGroups = groupByTournament(finished);

  return (
    <section id="calendario" className="bg-page-alt w-full py-section-gap">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">

        {/* Section title */}
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

        {/* Upcoming matches */}
        {upcomingGroups.length > 0 && (
          <div className="mb-14 space-y-10">
            <p className="text-[11px] font-bold text-brand-navy uppercase tracking-widest">
              {t.calendar.upcoming}
            </p>
            {upcomingGroups.map((g) => (
              <TournamentBlock key={g.name} group={g} months={t.calendar.months} weekdays={t.calendar.weekdays} />
            ))}
          </div>
        )}

        {/* Finished matches */}
        {finishedGroups.length > 0 && (
          <div className="space-y-10">
            <p className="text-[11px] font-bold text-dust uppercase tracking-widest">
              {t.calendar.results}
            </p>
            {finishedGroups.map((g) => (
              <TournamentBlock key={g.name} group={g} months={t.calendar.months} weekdays={t.calendar.weekdays} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
