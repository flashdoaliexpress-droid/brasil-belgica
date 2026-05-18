import type { LeagueStanding } from "../types";

export const leagueStandings: LeagueStanding[] = [
  { position: 1,  team: "Igdir 76",          played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 2,  team: "CAD Ixelles",        played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 3,  team: "Brasil",             played: 0, wins: 0, draws: 0, losses: 0, points: 0, isUs: true },
  { position: 4,  team: "Polonia",            played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 5,  team: "ACMB",              played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 6,  team: "Vilvoorde City",     played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 7,  team: "Anatolie 95",        played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 8,  team: "Emirdag",            played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 9,  team: "Ent. La Louve",      played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 10, team: "Hellas",             played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 11, team: "Marhaba SB",         played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 12, team: "Entente Veter.",     played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
  { position: 13, team: "X (FG)",             played: 0, wins: 0, draws: 0, losses: 0, points: 0 },
];

export const leagueInfo = {
  name: "Liga Trabalhista de Bruxelas",
  description:
    "A Liga Trabalhista é a principal competição amadora da comunidade imigrante em Bruxelas. Reúne clubes brasileiros, portugueses, marroquinos e africanos em uma disputa anual de pontos corridos, com 18 rodadas e acesso à divisão principal.",
  season: "2026",
  totalRounds: 18,
  currentRound: 0,
};
