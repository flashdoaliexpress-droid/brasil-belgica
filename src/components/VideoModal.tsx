import { useEffect, useRef, useState } from "react";
import type { Interview } from "../hooks/useInterviews";
import { imgUrl } from "../lib/imgUrl";

// Player mínimo: só o vídeo + um botão play/pause.
// Sem controles nativos (timeline, mute, fullscreen/zoom, PiP, menu de 3 pontos).
// O poster (thumbnail) aparece na hora e o vídeo só baixa ao dar play (preload="none").
export function VideoModal({ interview, onClose }: { interview: Interview; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Apresentação — ${interview.name}`}
    >
      <div
        className="relative w-full max-w-sm animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute -top-10 right-0 text-white hover:text-secondary-fixed transition-colors"
        >
          <span className="material-symbols-outlined text-4xl">close</span>
        </button>

        <div className="relative overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={interview.video}
            poster={imgUrl(interview.thumbnail, 400)}
            className="w-full h-auto block bg-black"
            playsInline
            autoPlay
            preload="none"
            disablePictureInPicture
            controlsList="nodownload nofullscreen noplaybackrate"
            onClick={togglePlay}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onContextMenu={(e) => e.preventDefault()}
          />

          {!playing && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Reproduzir"
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors"
            >
              <span className="material-symbols-outlined text-white text-7xl drop-shadow-lg">
                play_arrow
              </span>
            </button>
          )}
        </div>

        <div className="mt-3 text-center">
          <p className="font-headline-md text-headline-md text-white uppercase leading-none">
            {interview.name}
          </p>
          {interview.position && (
            <p className="text-[11px] font-bold text-secondary-fixed uppercase tracking-widest mt-1">
              {interview.position}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
