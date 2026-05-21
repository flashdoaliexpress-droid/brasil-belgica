import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Player } from "../types";

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("players")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        setPlayers(data ?? []);
        setLoading(false);
      });
  }, []);

  return { players, loading };
}
