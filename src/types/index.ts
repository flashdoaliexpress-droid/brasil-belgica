export interface Player {
  id: number;
  name: string;
  position: PlayerPosition;
  photo: string;
  number?: number;
  skills?: string[];
}

export type PlayerPosition =
  | "Goleiro"
  | "Zagueiro"
  | "Lateral Direito"
  | "Lateral Esquerdo"
  | "Volante"
  | "Meio Campo"
  | "Atacante"
  | "Ponta Direita"
  | "Ponta Esquerda"
  | "Centroavante";

export interface StaffMember {
  id: number;
  name: string;
  role: "Presidente" | "Diretor" | "Treinador";
  photo: string;
  bio?: string;
}

export interface ClubInfo {
  name: string;
  founded: number;
  city: string;
  country: string;
  instagram: string;
}

export type MatchStatus = "upcoming" | "live" | "finished";

export interface Match {
  id: number;
  date: string;
  time: string;
  competition: string;
  status: MatchStatus;
  home: { name: string; short: string; score?: number };
  away: { name: string; short: string; score?: number };
  venue: string;
}

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  image: string;
  featured?: boolean;
  content?: string;
}

export interface Title {
  id: number;
  year: number;
  name: string;
  competition: string;
}

export interface LeagueStanding {
  position: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  isUs?: boolean;
}
