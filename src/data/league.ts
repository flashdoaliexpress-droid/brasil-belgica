import type { LeagueStanding } from "../types";

export const leagueStandings: LeagueStanding[] = [
  { position: 1, team: "Atlético Bruxelas", played: 7, wins: 6, draws: 1, losses: 0, points: 19 },
  { position: 2, team: "Maghreb United",    played: 7, wins: 5, draws: 1, losses: 1, points: 16 },
  { position: 3, team: "Brasil",    played: 7, wins: 4, draws: 2, losses: 1, points: 14, isUs: true },
  { position: 4, team: "FC Iberico",        played: 7, wins: 4, draws: 1, losses: 2, points: 13 },
  { position: 5, team: "Lusitano BX",       played: 7, wins: 3, draws: 1, losses: 3, points: 10 },
  { position: 6, team: "Schaerbeek United", played: 7, wins: 2, draws: 2, losses: 3, points: 8 },
  { position: 7, team: "Real Anderlecht B", played: 7, wins: 2, draws: 1, losses: 4, points: 7 },
  { position: 8, team: "Étoile du Congo",   played: 7, wins: 1, draws: 1, losses: 5, points: 4 },
];

export const leagueInfo = {
  name: "Liga Trabalhista de Bruxelas",
  description:
    "A Liga Trabalhista é a principal competição amadora da comunidade imigrante em Bruxelas. Reúne clubes brasileiros, portugueses, marroquinos e africanos em uma disputa anual de pontos corridos, com 18 rodadas e acesso à divisão principal.",
  season: "2025/26",
  totalRounds: 18,
  currentRound: 7,
};
