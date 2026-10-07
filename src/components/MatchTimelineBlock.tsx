import { MatchCard, type MatchCardLabels } from "./MatchCard";
import type { Match } from "../types";

interface MatchTimelineBlockProps {
  title: string;
  matches: Match[];
  months: string[];
  weekdays: string[];
  labels: MatchCardLabels;
  awaitingUpdate?: boolean;
}

export default function MatchTimelineBlock({
  title,
  matches,
  months,
  weekdays,
  labels,
  awaitingUpdate = false,
}: MatchTimelineBlockProps) {
  if (matches.length === 0) return null;

  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <h2 className="font-headline-sm text-headline-sm md:font-headline-md md:text-headline-md uppercase leading-none text-ink">
          {title}
        </h2>
        <span className="rounded-full bg-brand-navy/10 px-3 py-1 text-sm font-semibold text-brand-navy">
          {matches.length}
        </span>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {matches.map((match) => (
          <MatchCard
            key={match.id}
            match={match}
            months={months}
            weekdays={weekdays}
            labels={labels}
            awaitingUpdate={awaitingUpdate}
          />
        ))}
      </div>
    </section>
  );
}
