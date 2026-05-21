import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Match, Goal } from "../types";

interface MatchRow {
  id: number;
  date: string;
  time: string;
  competition: string;
  tournament: string | null;
  group: string | null;
  phase: string | null;
  status: "upcoming" | "live" | "finished";
  venue: string;
  home_name: string;
  home_short: string;
  home_score: number | null;
  home_logo: string | null;
  away_name: string;
  away_short: string;
  away_score: number | null;
  away_logo: string | null;
}

interface GoalRow {
  id: number;
  match_id: number;
  team_side: "home" | "away";
  minute: number;
  player: string;
  own_goal: boolean;
}

function reconstruct(row: MatchRow, goalRows: GoalRow[]): Match {
  const homeGoals: Goal[] = goalRows
    .filter((g) => g.team_side === "home")
    .map((g) => ({ minute: g.minute, player: g.player, ownGoal: g.own_goal || undefined }));
  const awayGoals: Goal[] = goalRows
    .filter((g) => g.team_side === "away")
    .map((g) => ({ minute: g.minute, player: g.player, ownGoal: g.own_goal || undefined }));

  return {
    id: row.id,
    date: row.date,
    time: row.time,
    competition: row.competition,
    tournament: row.tournament ?? undefined,
    group: row.group ?? undefined,
    phase: row.phase ?? undefined,
    status: row.status,
    venue: row.venue,
    home: {
      name: row.home_name,
      short: row.home_short,
      score: row.home_score ?? undefined,
      logo: row.home_logo ?? undefined,
      goals: homeGoals.length > 0 ? homeGoals : undefined,
    },
    away: {
      name: row.away_name,
      short: row.away_short,
      score: row.away_score ?? undefined,
      logo: row.away_logo ?? undefined,
      goals: awayGoals.length > 0 ? awayGoals : undefined,
    },
  };
}

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from("matches").select("*").order("date").order("time"),
      supabase.from("goals").select("*"),
    ]).then(([matchRes, goalRes]) => {
      const matchRows = (matchRes.data ?? []) as MatchRow[];
      const goalRows = (goalRes.data ?? []) as GoalRow[];

      const built = matchRows.map((m) =>
        reconstruct(m, goalRows.filter((g) => g.match_id === m.id))
      );
      setMatches(built);
      setLoading(false);
    });
  }, []);

  return { matches, loading };
}
