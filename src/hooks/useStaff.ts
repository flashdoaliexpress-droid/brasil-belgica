import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { StaffMember } from "../types";

let _cache: StaffMember[] | null = null;

export function useStaff() {
  const [staff, setStaff]     = useState<StaffMember[]>(_cache ?? []);
  const [loading, setLoading] = useState(!_cache);

  useEffect(() => {
    if (_cache) return;
    supabase
      .from("staff")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        _cache = data ?? [];
        setStaff(_cache);
        setLoading(false);
      });
  }, []);

  return { staff, loading };
}
