import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { NewsItem } from "../types";

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("news")
      .select("*")
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        setNews(data ?? []);
        setLoading(false);
      });
  }, []);

  return { news, loading };
}
