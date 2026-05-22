import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface Interview {
  id: number;
  name: string;
  video: string;
  thumbnail: string;
  position?: string;
  date?: string;
}

let _cache: Interview[] | null = null;

export function useInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>(_cache ?? []);
  const [loading, setLoading]       = useState(!_cache);

  useEffect(() => {
    if (_cache) return;
    supabase
      .from("interviews")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        _cache = data ?? [];
        setInterviews(_cache);
        setLoading(false);
      });
  }, []);

  return { interviews, loading };
}
