import { useState } from "react";
import type { Player, PlayerPosition } from "../types";

interface Props {
  player: Player;
  active: boolean;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const positionStyle: Record<PlayerPosition, string> = {
  Goleiro: "bg-brand-green text-black",
  Zagueiro: "bg-white/10 backdrop-blur-md text-on-surface border border-white/20",
  "Lateral Direito": "bg-white/10 backdrop-blur-md text-on-surface border border-white/20",
  "Lateral Esquerdo": "bg-white/10 backdrop-blur-md text-on-surface border border-white/20",
  Volante: "bg-white/10 backdrop-blur-md text-on-surface border border-white/20",
  "Meio Campo": "bg-white/10 backdrop-blur-md text-on-surface border border-white/20",
  Atacante: "bg-brand-yellow text-black",
};

export function PlayerCard({ player, active }: Props) {
  const [imgError, setImgError] = useState(false);

  const stateClass = active ? "ring-2 ring-secondary-fixed" : "";

  return (
    <div
      className={`relative w-[260px] h-[370px] flex-shrink-0 overflow-hidden bg-surface-container-lowest transition-all duration-300 ${stateClass}`}
    >
      {imgError ? (
        <div className="absolute inset-0 bg-inverse-primary flex items-center justify-center">
          <span className="font-headline-xl text-headline-xl text-on-primary-container opacity-40 select-none">
            {initials(player.name)}
          </span>
        </div>
      ) : (
        <img
          src={player.photo}
          alt={`${player.name} — ${player.position}`}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0820] via-[#1a1558]/70 to-transparent" />

      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end">
        <span
          className={`font-label-md text-label-md px-3 py-1 w-max mb-3 uppercase tracking-widest ${positionStyle[player.position]}`}
        >
          {player.position}
        </span>
        <h3 className="font-headline-md text-headline-md text-secondary-fixed uppercase m-0 leading-none">
          {player.name}
        </h3>
      </div>
    </div>
  );
}
