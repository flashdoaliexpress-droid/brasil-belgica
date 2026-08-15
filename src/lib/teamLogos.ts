import type { MatchTeam } from "../types";

const LEAGUE_TEAM_LOGOS: Record<string, string> = {
  EVM: "/images/escudos/liga-trabalhista-2026-27/entente-veteran-molenbeek.png",
  REN: "/images/escudos/liga-trabalhista-2026-27/fc-renaissance-bruxelloise.png",
  MAR: "/images/escudos/liga-trabalhista-2026-27/marhaba-solidarity-bxl.png",
  TUR: "/images/escudos/liga-trabalhista-2026-27/turkish-utd-bxl.png",
  SVI: "/images/escudos/liga-trabalhista-2026-27/sporting-vilvoorde.png",
  HEL: "/images/escudos/liga-trabalhista-2026-27/hellas-berchem.png",
  ANA: "/images/escudos/liga-trabalhista-2026-27/fc-anatolie-95.png",
  VIL: "/images/escudos/liga-trabalhista-2026-27/vilvoorde-city.png",
  ELL: "/images/escudos/liga-trabalhista-2026-27/entente-la-louve.png",
  FSC: "/images/escudos/liga-trabalhista-2026-27/fc-fscb-bruxelles.png",
  POL: "/images/escudos/liga-trabalhista-2026-27/fc-polonia.png",
};

const HISTORICAL_TEAM_LOGOS: Record<string, string> = {
  "brazuka fc": "/images/escudos/torneios-e-amistosos/brazuka-fc.png",
  "cabo verde": "/images/escudos/torneios-e-amistosos/cabo-verde.png",
  "cad ixelles": "/images/escudos/torneios-e-amistosos/cad-ixelles.png",
  "igdir 76": "/images/escudos/torneios-e-amistosos/igdir-76.png",
  "os lusitanos": "/images/escudos/torneios-e-amistosos/os-lusitanos.png",
  "so fumo": "/images/escudos/torneios-e-amistosos/so-fumo.png",
};

const HISTORICAL_SHORT_LOGOS: Record<string, string> = {
  BFC: "/images/escudos/torneios-e-amistosos/brazuka-fc.png",
  CPV: "/images/escudos/torneios-e-amistosos/cabo-verde.png",
  CAD: "/images/escudos/torneios-e-amistosos/cad-ixelles.png",
  IGD: "/images/escudos/torneios-e-amistosos/igdir-76.png",
  LUS: "/images/escudos/torneios-e-amistosos/os-lusitanos.png",
  SOF: "/images/escudos/torneios-e-amistosos/so-fumo.png",
};

function normalizeTeamName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export function localTeamLogo(team: MatchTeam) {
  return LEAGUE_TEAM_LOGOS[team.short]
    ?? HISTORICAL_SHORT_LOGOS[team.short]
    ?? HISTORICAL_TEAM_LOGOS[normalizeTeamName(team.name)];
}
