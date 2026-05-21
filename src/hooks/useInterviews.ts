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

export function useInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("interviews")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        setInterviews(data ?? []);
        setLoading(false);
      });
  }, []);

  return { interviews, loading };
}
