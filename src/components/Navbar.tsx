import { useState } from "react";
import { useScrollNavbar } from "../hooks/useScrollNavbar";
import { club } from "../data/club";

type SectionId = "hero" | "sobre" | "jogadores" | "instagram" | "patrocinadores" | "entrevistas";

interface NavLink {
  id: SectionId;
  label: string;
}

const links: NavLink[] = [
  { id: "hero", label: "INÍCIO" },
  { id: "sobre", label: "SOBRE" },
  { id: "jogadores", label: "JOGADORES" },
  { id: "instagram", label: "INSTAGRAM" },
  { id: "entrevistas", label: "ENTREVISTAS" },
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
        <button
          type="button"
          onClick={() => handleClick("hero")}
          className="flex items-center hover:opacity-90 transition-opacity"
          aria-label="Ir para o topo"
        >
          <img
            src="/images/logo-header.webp"
            alt="Brasil Bélgica F.C."
            className="h-12 md:h-14 w-auto"
          />
        </button>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleClick(link.id)}
                className={`font-label-lg text-label-lg transition-all duration-300 ${
                  isActive
                    ? "text-secondary-fixed border-b-2 border-secondary-fixed pb-1"
                    : "text-on-surface-variant hover:text-secondary-fixed"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center">
          <a
            className="font-label-lg text-label-lg text-secondary-fixed hover:text-white transition-colors duration-300"
            href={`https://instagram.com/${club.instagram}`}
            target="_blank"
            rel="noreferrer noopener"
          >
            @{club.instagram}
          </a>
        </div>

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
              className={`font-label-lg text-label-lg text-left ${
                active === link.id ? "text-secondary-fixed" : "text-on-surface-variant"
              }`}
            >
              {link.label}
            </button>
          ))}
          <a
            className="font-label-lg text-label-lg text-secondary-fixed"
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
