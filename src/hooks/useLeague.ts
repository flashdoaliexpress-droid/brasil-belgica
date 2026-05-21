import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { LeagueStanding } from "../types";

export interface LeagueInfo {
  id: number;
  name: string;
  description: string | null;
  season: string;
  total_rounds: number;
  current_round: number;
}

export function useLeague() {
  const [standings, setStandings] = useState<LeagueStanding[]>([]);
  const [info, setInfo] = useState<LeagueInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      supabase.from("league_standings").select("*").order("position"),
      supabase.from("league_info").select("*").eq("id", 1).single(),
    ]).then(([standingsRes, infoRes]) => {
      const rows = (standingsRes.data ?? []).map((r: Record<string, unknown>) => ({
        ...r,
        isUs: r.is_us,
      })) as LeagueStanding[];
      setStandings(rows);
      setInfo(infoRes.data as LeagueInfo | null);
      setLoading(false);
    });
  }, []);

  return { standings, info, loading };
}
