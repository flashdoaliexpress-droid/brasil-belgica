import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { NewsItem } from "../types";

const cache: NewsItem[] | null = null;
let _cache: NewsItem[] | null = null;

export function useNews() {
  const [news, setNews]       = useState<NewsItem[]>(_cache ?? []);
  const [loading, setLoading] = useState(!_cache);

  useEffect(() => {
    if (_cache) return;
    supabase
      .from("news")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        _cache = data ?? [];
        setNews(_cache);
        setLoading(false);
      });
  }, []);

  return { news, loading };
}

void cache; // suppress unused warning
