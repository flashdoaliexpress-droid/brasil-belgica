import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Player } from "../types";

let _cache: Player[] | null = null;

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>(_cache ?? []);
  const [loading, setLoading] = useState(!_cache);

  useEffect(() => {
    if (_cache) return;
    supabase
      .from("players")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        _cache = data ?? [];
        setPlayers(_cache);
        setLoading(false);
      });
  }, []);

  return { players, loading };
}
