export interface Player {
  id: number;
  name: string;
  position: PlayerPosition;
  photo: string;
  number?: number;
}

export type PlayerPosition =
  | "Goleiro"
  | "Zagueiro"
  | "Lateral Direito"
  | "Lateral Esquerdo"
  | "Volante"
  | "Meio Campo"
  | "Atacante";

export interface StaffMember {
  id: number;
  name: string;
  role: "Presidente" | "Diretor" | "Treinador";
  photo: string;
}

export interface ClubInfo {
  name: string;
  founded: number;
  city: string;
  country: string;
  instagram: string;
}
