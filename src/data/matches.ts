import type { Match } from "../types";

export const matches: Match[] = [
  {
    id: 1,
    date: "2026-05-24",
    time: "15:00",
    competition: "Liga Trabalhista — Rodada 8",
    status: "upcoming",
    home: { name: "Brasil", short: "BBE" },
    away: { name: "Atlético Bruxelas", short: "ATB" },
    venue: "Stade Communal — Anderlecht",
  },
  {
    id: 2,
    date: "2026-05-31",
    time: "17:30",
    competition: "Liga Trabalhista — Rodada 9",
    status: "upcoming",
    home: { name: "FC Iberico", short: "FCI" },
    away: { name: "Brasil", short: "BBE" },
    venue: "Centre Sportif — Schaerbeek",
  },
  {
    id: 3,
    date: "2026-05-10",
    time: "16:00",
    competition: "Liga Trabalhista — Rodada 7",
    status: "finished",
    home: { name: "Brasil", short: "BBE", score: 3 },
    away: { name: "Lusitano BX", short: "LUS", score: 1 },
    venue: "Stade Roi Baudouin — Anexo C",
  },
  {
    id: 4,
    date: "2026-05-03",
    time: "14:30",
    competition: "Liga Trabalhista — Rodada 6",
    status: "finished",
    home: { name: "Maghreb United", short: "MAG", score: 0 },
    away: { name: "Brasil", short: "BBE", score: 2 },
    venue: "Parc Josaphat — Campo 2",
  },
];
