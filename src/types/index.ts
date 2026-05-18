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

export interface Goal {
  minute: number;
  player: string;
  ownGoal?: boolean;
}

export interface MatchTeam {
  name: string;
  short: string;
  score?: number;
  logo?: string;
  goals?: Goal[];
}

export interface Match {
  id: number;
  date: string;
  time: string;
  competition: string;
  tournament?: string;
  group?: string;
  phase?: string;
  status: MatchStatus;
  home: MatchTeam;
  away: MatchTeam;
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
  video?: string;
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
