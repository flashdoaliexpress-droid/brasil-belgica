import type { Match } from "../types";

export type MatchCategory = "league" | "cup" | "friendly" | "tournament";

export interface CompetitionMatchGroup {
  key: string;
  name: string;
  category: MatchCategory;
  matches: Match[];
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function classifyMatch(match: Match): MatchCategory {
  const description = normalize(`${match.competition} ${match.tournament ?? ""}`);
  if (description.includes("amistoso") || description.includes("friendly")) return "friendly";
  if (
    description.includes("coupe du president") ||
    description.includes("copa") ||
    description.includes("cup")
  ) return "cup";
  if (description.includes("liga trabalhista") || description.includes("division 3")) return "league";
  return "tournament";
}

export function formatMatchDate(iso: string, months: string[], weekdays: string[]) {
  const date = new Date(`${iso}T12:00:00`);
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: months[date.getMonth()],
    weekday: weekdays[date.getDay()],
  };
}

export function localIsoDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function compareMatches(a: Match, b: Match) {
  return `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
}

function relevantOrder(matches: Match[], today: string) {
  const previous = matches
    .filter((match) => match.status === "finished" || match.date < today)
    .sort((a, b) => compareMatches(b, a));
  const next = matches
    .filter((match) => match.status !== "finished" && match.date >= today)
    .sort(compareMatches);
  return [...previous, ...next];
}

export function groupMatchesByCompetition(
  matches: Match[],
  friendlyGroupName: string,
  today = localIsoDate()
): CompetitionMatchGroup[] {
  const groups = new Map<string, CompetitionMatchGroup>();

  for (const match of matches) {
    const category = classifyMatch(match);
    const name = category === "friendly"
      ? friendlyGroupName
      : (match.tournament?.trim() || match.competition.trim());
    const key = `${category}:${name}`;
    const group = groups.get(key) ?? { key, name, category, matches: [] };
    group.matches.push(match);
    groups.set(key, group);
  }

  return Array.from(groups.values())
    .map((group) => ({ ...group, matches: relevantOrder(group.matches, today) }))
    .sort((a, b) => {
      const aNext = a.matches.find((match) => match.status !== "finished" && match.date >= today);
      const bNext = b.matches.find((match) => match.status !== "finished" && match.date >= today);
      if (aNext && bNext) return compareMatches(aNext, bNext);
      if (aNext) return -1;
      if (bNext) return 1;
      const aLatest = a.matches[0];
      const bLatest = b.matches[0];
      return aLatest && bLatest ? compareMatches(bLatest, aLatest) : 0;
    });
}

export function homeMatchesForGroup(matches: Match[], today = localIsoDate()) {
  const previous = matches.filter((match) => match.status === "finished" || match.date < today);
  const next = matches.filter((match) => match.status !== "finished" && match.date >= today);

  if (next.length === 0) return previous.slice(0, 3);
  const recent = previous.slice(0, 1);
  return [...recent, ...next.slice(0, 3 - recent.length)];
}
