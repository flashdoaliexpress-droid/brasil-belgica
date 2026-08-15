import { useState } from "react";
import type { Goal, Match, MatchTeam } from "../types";
import { formatMatchDate } from "../lib/matches";
import { localTeamLogo } from "../lib/teamLogos";
import bbeLogo from "../assets/Logo header scroll  - logo pro calendario.png";

export interface MatchCardLabels {
  win: string;
  draw: string;
  loss: string;
  awaiting: string;
  venue: string;
}

function isBrasilTeam(team: MatchTeam) {
  return team.short === "BBE" || team.short === "BRA" || team.name.trim().toLowerCase() === "brasil";
}

function TeamLogo({ team }: { team: MatchTeam }) {
  const [logoIndex, setLogoIndex] = useState(0);
  const candidates = isBrasilTeam(team)
    ? [bbeLogo]
    : Array.from(new Set([team.logo, localTeamLogo(team)].filter((logo): logo is string => Boolean(logo))));
  const logo = candidates[logoIndex];

  return (
    <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 bg-white border border-hairline rounded-sm overflow-hidden">
      {logo ? (
        <img
          src={logo}
          alt={`Escudo ${team.name}`}
          className="w-9 h-9 object-contain"
          onError={() => setLogoIndex((index) => index + 1)}
        />
      ) : (
        <span className="text-[10px] font-bold text-stone">{team.short}</span>
      )}
    </div>
  );
}

function GoalsList({ goals }: { goals: Goal[] }) {
  if (!goals.length) return null;
  return (
    <p className="text-[10px] text-dust leading-relaxed mt-0.5 ml-[52px]">
      {goals.map((goal, index) => (
        <span key={`${goal.minute}-${goal.player}-${index}`}>
          {index > 0 && <span className="mx-1 opacity-40">·</span>}
          <span className="font-semibold text-stone">{goal.minute}'</span>{" "}
          {goal.player}
          {goal.ownGoal && <span className="opacity-60"> (GC)</span>}
        </span>
      ))}
    </p>
  );
}

function brasilResult(match: Match): "win" | "draw" | "loss" | null {
  if (match.status !== "finished") return null;
  const brasilAtHome = isBrasilTeam(match.home);
  const brasilScore = brasilAtHome ? (match.home.score ?? 0) : (match.away.score ?? 0);
  const opponentScore = brasilAtHome ? (match.away.score ?? 0) : (match.home.score ?? 0);
  if (brasilScore > opponentScore) return "win";
  if (brasilScore === opponentScore) return "draw";
  return "loss";
}

export function MatchCard({
  match,
  months,
  weekdays,
  labels,
  awaitingUpdate = false,
}: {
  match: Match;
  months: string[];
  weekdays: string[];
  labels: MatchCardLabels;
  awaitingUpdate?: boolean;
}) {
  const date = formatMatchDate(match.date, months, weekdays);
  const result = brasilResult(match);
  const finished = match.status === "finished";
  const resultStyle = {
    win: "text-emerald-600 bg-emerald-50 border-emerald-200",
    draw: "text-stone bg-stone/10 border-stone/20",
    loss: "text-brand-red bg-red-50 border-red-200",
  } as const;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(match.venue)}`;

  return (
    <article className="bg-white border border-hairline overflow-hidden hover:border-brand-navy/20 hover:shadow-sm transition-all duration-300 flex flex-col">
      <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-hairline bg-page/60">
        <div className="min-w-0">
          <p className="text-[9px] font-bold tracking-widest text-brand-navy uppercase truncate">
            {match.tournament ?? match.competition}
          </p>
          <p className="text-[10px] text-dust mt-1">
            {date.weekday}, {date.day} {date.month}
          </p>
        </div>
        <div className="flex items-center gap-1 text-dust flex-shrink-0">
          <span className="material-symbols-outlined text-[14px]">schedule</span>
          <span className="text-[11px] font-semibold">{match.time}</span>
        </div>
      </div>

      <div className="px-4 pt-3 flex items-center gap-2 flex-wrap">
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
        {result && (
          <span className={`text-[9px] font-bold tracking-widest px-2 py-0.5 border ${resultStyle[result]}`}>
            {labels[result].toUpperCase()}
          </span>
        )}
        {awaitingUpdate && (
          <span className="text-[9px] font-bold tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5">
            {labels.awaiting.toUpperCase()}
          </span>
        )}
      </div>

      <div className="px-4 py-4 space-y-3 flex-1">
        {[match.home, match.away].map((team) => (
          <div key={`${match.id}-${team.short}-${team.name}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <TeamLogo team={team} />
                <p className={`text-sm font-semibold truncate ${isBrasilTeam(team) ? "text-brand-navy" : "text-ink"}`}>
                  {team.name}
                </p>
              </div>
              <span className={`flex-shrink-0 ${finished ? "text-xl font-bold text-ink" : "text-xs text-dust"}`}>
                {finished ? (team.score ?? "-") : "-"}
              </span>
            </div>
            {finished && team.goals && <GoalsList goals={team.goals} />}
          </div>
        ))}
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-start gap-2 px-4 py-3 border-t border-hairline text-[10px] text-dust hover:text-brand-navy transition-colors"
        aria-label={`${labels.venue}: ${match.venue}`}
      >
        <span className="material-symbols-outlined text-[15px] flex-shrink-0">location_on</span>
        <span>{match.venue}</span>
      </a>
    </article>
  );
}
