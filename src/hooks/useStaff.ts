import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { StaffMember } from "../types";

export function useStaff() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("staff")
      .select("*")
      .order("sort_order")
      .then(({ data }) => {
        setStaff(data ?? []);
        setLoading(false);
      });
  }, []);

  return { staff, loading };
}
