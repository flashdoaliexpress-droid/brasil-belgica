import { useState } from "react";
import { useScrollNavbar } from "../hooks/useScrollNavbar";
import { club } from "../data/club";

type SectionId = "hero" | "sobre" | "jogadores" | "instagram" | "patrocinadores" | "entrevistas";

interface NavLink {
  id: SectionId;
  label: string;
}

const links: NavLink[] = [
  { id: "hero",          label: "INÍCIO" },
  { id: "sobre",         label: "SOBRE" },
  { id: "jogadores",     label: "JOGADORES" },
  { id: "entrevistas",   label: "ENTREVISTAS" },
  { id: "patrocinadores", label: "PATROCINADORES" },
];

interface Props {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
}

export function Navbar({ active, onNavigate }: Props) {
  const scrolled = useScrollNavbar(80);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (id: SectionId) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-primary-container/95 backdrop-blur-lg border-white/10 shadow-lg"
          : "bg-transparent backdrop-blur-md border-white/5"
      }`}
    >
      <div className="flex justify-between items-center w-full px-container-padding-mobile md:px-container-padding-desktop py-4 max-w-7xl mx-auto">

        {/* Logo + links agrupados à esquerda */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => handleClick("hero")}
            className="flex items-center hover:opacity-90 transition-opacity flex-shrink-0"
            aria-label="Ir para o topo"
          >
            <img
              src="/images/logo-header.webp"
              alt="Brasil Bélgica F.C."
              className="h-12 md:h-14 w-auto"
            />
          </button>

          {/* Separador vertical */}
          <div className="hidden md:block w-px h-6 bg-white/20 mx-7" aria-hidden="true" />

          <nav className="hidden md:flex items-center gap-5">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleClick(link.id)}
                  className={`text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${
                    isActive
                      ? "text-secondary-fixed border-b-2 border-secondary-fixed pb-0.5"
                      : "text-on-surface-variant hover:text-secondary-fixed"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Instagram handle — direita */}
        <a
          className="hidden md:flex items-center gap-2 font-bold text-[11px] tracking-[0.08em] text-secondary-fixed hover:text-white transition-colors duration-300"
          href={`https://instagram.com/${club.instagram}`}
          target="_blank"
          rel="noreferrer noopener"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" className="fill-current flex-shrink-0" aria-hidden="true">
            <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.804.249 2.227.413.56.218.96.478 1.38.898.42.42.68.82.898 1.38.164.423.36 1.057.413 2.227.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.804-.413 2.227a3.72 3.72 0 0 1-.898 1.38c-.42.42-.82.68-1.38.898-.423.164-1.057.36-2.227.413-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.804-.249-2.227-.413a3.72 3.72 0 0 1-1.38-.898 3.72 3.72 0 0 1-.898-1.38c-.164-.423-.36-1.057-.413-2.227C2.212 15.584 2.2 15.205 2.2 12s.012-3.584.07-4.85c.054-1.17.249-1.804.413-2.227.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.423-.164 1.057-.36 2.227-.413C8.416 2.212 8.795 2.2 12 2.2zm0-2.2C8.741 0 8.332.014 7.052.072 5.775.131 4.902.333 4.14.63a5.92 5.92 0 0 0-2.14 1.393A5.92 5.92 0 0 0 .63 4.14C.333 4.902.131 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.06 1.277.261 2.15.558 2.912a5.92 5.92 0 0 0 1.39 2.14 5.92 5.92 0 0 0 2.14 1.392c.762.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.06 2.15-.261 2.912-.558a5.92 5.92 0 0 0 2.14-1.392 5.92 5.92 0 0 0 1.392-2.14c.297-.762.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.06-1.277-.261-2.15-.558-2.912a5.92 5.92 0 0 0-1.392-2.14A5.92 5.92 0 0 0 19.86.63C19.098.333 18.225.131 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
          @{club.instagram}
        </a>

        {/* Hambúrguer mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-on-surface p-2"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-primary-container/95 backdrop-blur-lg border-t border-white/10 px-container-padding-mobile py-6 flex flex-col gap-6">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleClick(link.id)}
              className={`text-[11px] font-bold tracking-[0.08em] uppercase text-left ${
                active === link.id ? "text-secondary-fixed" : "text-on-surface-variant"
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            className="text-[11px] font-bold tracking-[0.08em] uppercase text-secondary-fixed"
            href={`https://instagram.com/${club.instagram}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            @{club.instagram}
          </a>
        </nav>
      )}
    </header>
  );
}
