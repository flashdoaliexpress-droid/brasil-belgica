import { useEffect, useState } from "react";
import { usePlayers } from "../hooks/usePlayers";
import type { Player } from "../types";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../i18n/LanguageContext";
import { imgUrl } from "../lib/imgUrl";

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}


/* Modal — white background */
function PlayerModal({ player, onClose, positionLabel, jerseyLabel, skillsLabel }: {
  player: Player;
  onClose: () => void;
  positionLabel: string;
  jerseyLabel: string;
  skillsLabel: string;
}) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${player.name} — ${player.position}`}
    >
      <div
        className="relative bg-white w-full max-w-2xl overflow-hidden flex flex-row max-h-[90dvh] animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Photo column */}
        <div className="relative w-[42%] md:w-[45%] flex-shrink-0 bg-stone/10">
          {imgError ? (
            <div className="h-full min-h-[160px] flex items-center justify-center">
              <span className="text-4xl font-bold text-brand-navy/30">
                {initials(player.name)}
              </span>
            </div>
          ) : (
            <img
              src={imgUrl(player.photo, 400)}
              alt={player.name}
              className="w-full h-full object-cover object-top block"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        {/* Details column */}
        <div className="flex-1 p-4 md:p-8 flex flex-col gap-3 md:gap-5 overflow-y-auto bg-white">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-stone hover:text-ink transition-colors z-10"
            aria-label="Fechar"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>

          <div>
            {/* Accent bars */}
            <div className="space-y-1 mb-4">
              <div className="w-10 h-[3px] bg-[#0120F9]" />
              <div className="w-6 h-[2px] bg-brand-yellow" />
            </div>

            {/* Number — plain, no shadow */}
            {player.number !== undefined && (
              <p className="text-[2.5rem] md:text-[4rem] font-bold leading-none text-[#0120F9]/15 select-none mb-1 hidden md:block">
                {player.number}
              </p>
            )}

            <p className="text-[10px] md:text-[11px] font-bold text-brand-navy uppercase tracking-widest mb-2 md:mb-3">
              {positionLabel}
            </p>

            <h3 className="text-lg md:text-3xl font-bold text-ink uppercase leading-tight">
              {player.name}
            </h3>

            {player.number !== undefined && (
              <p className="text-sm text-dust mt-1">
                {jerseyLabel} {player.number}
              </p>
            )}

            {/* Bottom accent bars */}
            <div className="space-y-1 mt-4">
              <div className="w-6 h-[2px] bg-brand-yellow" />
              <div className="w-10 h-[3px] bg-[#0120F9]" />
            </div>

            {player.skills && player.skills.length > 0 && (
              <div className="mt-5">
                <p className="text-[10px] font-bold text-dust uppercase tracking-widest mb-2">{skillsLabel}</p>
                <p className="text-sm text-stone leading-relaxed">{player.skills.join(" · ")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PlayerGridCard({ player, index, onClick, positionLabel }: { player: Player; index: number; onClick: (p: Player) => void; positionLabel: string }) {
  const [imgError, setImgError] = useState(false);
  const { ref, inView } = useInView(0.05);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${(index % 5) * 80}ms` }}
      className={`group relative cursor-pointer overflow-hidden bg-[#0f0d3e] transition-all duration-700 ring-0 hover:ring-2 focus-visible:ring-2 hover:ring-[#FDDE00] focus-visible:ring-[#FDDE00] hover:shadow-[0_0_18px_4px_rgba(253,222,0,0.45)] focus-visible:shadow-[0_0_18px_4px_rgba(253,222,0,0.45)] ${inView ? "opacity-100" : "opacity-0"}`}
      onClick={() => onClick(player)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(player); }}
      aria-label={`Ver perfil de ${player.name}`}
    >
      {imgError ? (
          <div className="w-full h-64 flex items-center justify-center bg-[#0f0d3e]">
            <span className="text-4xl font-bold text-brand-yellow/40">
              {initials(player.name)}
            </span>
          </div>
        ) : (
          <img
            src={player.photo}
            alt={player.name}
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-auto block"
          />
        )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0820]/90 via-[#0a0820]/20 to-transparent" />

      {/* Jersey number */}
      {player.number !== undefined && (
        <div className="absolute top-2 right-3 text-lg font-bold text-brand-yellow/30 group-hover:text-[#FDDE00] group-hover:drop-shadow-[0_0_6px_#FDDE00] leading-none select-none transition-all duration-300">
          {player.number}
        </div>
      )}

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
        <p className="text-[10px] font-bold text-brand-yellow uppercase tracking-widest leading-none mb-1 truncate">
          {positionLabel}
        </p>
        <h3 className="font-headline-sm text-headline-sm text-white uppercase leading-none truncate">
          {player.name}
        </h3>
      </div>
    </div>
  );
}

export function PlayersSection() {
  const { t } = useLanguage();
  const { players } = usePlayers();
  const [activePlayer, setActivePlayer] = useState<Player | null>(null);
  const { ref: titleRef, inView: titleVisible } = useInView();

  return (
    <section
      id="jogadores"
      className="relative pt-32 pb-section-gap overflow-hidden bg-[#1F185F]"
    >
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop relative z-10">
        <div
          ref={titleRef}
          className={`mb-12 transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
        >
          <div className="space-y-1.5 mb-4">
            <div className="w-12 h-[3px] bg-[#0120F9]" />
            <div className="w-7 h-[2px] bg-brand-yellow" />
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-white uppercase leading-none">
            {t.players.title}
          </h2>
          <div className="space-y-1.5 mt-4 mb-6">
            <div className="w-7 h-[2px] bg-brand-yellow" />
            <div className="w-12 h-[3px] bg-[#0120F9]" />
          </div>
          <p className="text-sm text-white/60 max-w-md">
            {t.players.clickHint}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {players.map((player, i) => (
            <PlayerGridCard
              key={player.id}
              player={player}
              index={i}
              onClick={setActivePlayer}
              positionLabel={t.players.positions[player.position] ?? player.position}
            />
          ))}
        </div>
      </div>

      {activePlayer && (
        <PlayerModal
          player={activePlayer}
          onClose={() => setActivePlayer(null)}
          positionLabel={t.players.positions[activePlayer.position] ?? activePlayer.position}
          jerseyLabel={t.players.jersey}
          skillsLabel={t.players.skillsLabel}
        />
      )}
    </section>
  );
}
