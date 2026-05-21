import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Title } from "../types";

export function useTitles() {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("titles")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        setTitles(data ?? []);
        setLoading(false);
      });
  }, []);

  return { titles, loading };
}
