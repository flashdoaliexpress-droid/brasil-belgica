import { useRef, useState } from "react";
import { useScrollNavbar } from "../hooks/useScrollNavbar";
import { useLanguage } from "../i18n/LanguageContext";
import type { Locale } from "../i18n/translations";
import logoColorido from "../assets/SOBRE NÓS.png";

type SectionId =
  | "hero"
  | "sobre"
  | "calendario"
  | "jogadores"
  | "entrevistas"
  | "noticias"
  | "titulos"
  | "liga"
  | "comissao"
  | "patrocinadores";

const LOCALES: { value: Locale; flag: string; label: string }[] = [
  { value: "pt", flag: "🇧🇷", label: "PT" },
  { value: "en", flag: "🇬🇧", label: "EN" },
  { value: "fr", flag: "🇫🇷", label: "FR" },
  { value: "nl", flag: "🇳🇱", label: "NL" },
];

interface Props {
  active: SectionId;
  onNavigate: (id: SectionId) => void;
  onOpenApresentacoes: () => void;
}

function LanguageSelector({ scrolled }: { scrolled: boolean }) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LOCALES.find((l) => l.value === locale)!;

  const handleSelect = (value: Locale) => {
    setLocale(value);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Selecionar idioma"
        className={`flex items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] uppercase transition-colors duration-300 px-2 py-1 rounded ${
          scrolled
            ? "text-ink hover:text-stone"
            : "text-white/80 hover:text-white"
        }`}
      >
        <span className="text-base leading-none">{current.flag}</span>
        {current.label}
        <span
          className={`material-symbols-outlined text-[14px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <ul
            role="listbox"
            aria-label="Idiomas disponíveis"
            className="absolute right-0 top-full mt-2 z-50 bg-white border border-hairline shadow-md min-w-[120px] py-1"
          >
            {LOCALES.map((l) => (
              <li key={l.value} role="option" aria-selected={l.value === locale}>
                <button
                  type="button"
                  onClick={() => handleSelect(l.value)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[11px] font-bold tracking-[0.08em] uppercase transition-colors hover:bg-stone/10 ${
                    l.value === locale ? "text-brand-navy" : "text-ink"
                  }`}
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  {l.label}
                  {l.value === locale && (
                    <span className="material-symbols-outlined text-[13px] ml-auto text-brand-navy" aria-hidden="true">
                      check
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export function Navbar({ active, onNavigate, onOpenApresentacoes }: Props) {
  const scrolled = useScrollNavbar(80);
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale, t } = useLanguage();

  const navLinks = [
    { id: "hero" as SectionId,        label: t.nav.home },
    { id: "sobre" as SectionId,       label: t.nav.about },
    { id: "calendario" as SectionId,  label: t.nav.calendar },
    { id: "jogadores" as SectionId,   label: t.nav.squad },
    { id: "noticias" as SectionId,    label: t.nav.news },
    { id: "liga" as SectionId,        label: t.nav.league },
  ];

  const handleClick = (id: SectionId) => {
    setMenuOpen(false);
    onNavigate(id);
  };

  const handleApresentacoes = () => {
    setMenuOpen(false);
    onOpenApresentacoes();
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white border-hairline shadow-sm"
          : "bg-transparent backdrop-blur-md border-white/5"
      }`}
    >
      <div className="flex justify-between items-center w-full px-container-padding-mobile md:px-container-padding-desktop py-3 max-w-7xl mx-auto">

        {/* Logo + links */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => handleClick("hero")}
            className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0"
            aria-label="Ir para o topo"
          >
            {scrolled ? (
              <img
                src={logoColorido}
                alt="Brasil F.C."
                className="h-10 md:h-12 w-auto object-contain"
              />
            ) : (
              <img
                src="/images/logo-header.webp"
                alt="Brasil F.C."
                className="h-10 md:h-12 w-auto"
              />
            )}
          </button>

          <div className={`hidden md:block w-px h-5 mx-6 ${scrolled ? "bg-hairline" : "bg-white/20"}`} aria-hidden="true" />

          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleClick(link.id)}
                  className={`text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${
                    isActive
                      ? scrolled
                        ? "text-ink border-b-2 border-ink pb-0.5"
                        : "text-white border-b-2 border-white pb-0.5"
                      : scrolled
                        ? "text-stone hover:text-ink"
                        : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              type="button"
              onClick={handleApresentacoes}
              className={`text-[11px] font-bold tracking-[0.08em] uppercase transition-all duration-300 ${
                scrolled ? "text-stone hover:text-ink" : "text-white/75 hover:text-white"
              }`}
            >
              {t.nav.presentations}
            </button>
          </nav>
        </div>

        {/* Language selector (desktop) */}
        <LanguageSelector scrolled={scrolled} />

        {/* Hambúrguer mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className={`md:hidden p-2 ${scrolled ? "text-ink" : "text-white"}`}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-hairline px-container-padding-mobile py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleClick(link.id)}
              className={`text-[11px] font-bold tracking-[0.08em] uppercase text-left transition-colors ${
                active === link.id ? "text-ink" : "text-stone hover:text-ink"
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={handleApresentacoes}
            className="text-[11px] font-bold tracking-[0.08em] uppercase text-left text-stone hover:text-ink transition-colors"
          >
            {t.nav.presentations}
          </button>

          {/* Language selector mobile */}
          <div className="pt-2 border-t border-hairline">
            <p className="text-[10px] font-bold text-dust uppercase tracking-widest mb-3">Idioma</p>
            <div className="flex gap-2 flex-wrap">
              {LOCALES.map((l) => (
                <button
                  key={l.value}
                  type="button"
                  onClick={() => { setLocale(l.value); setMenuOpen(false); }}
                  className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold tracking-[0.08em] uppercase border transition-colors ${
                    l.value === locale
                      ? "border-brand-navy text-brand-navy"
                      : "border-hairline text-stone hover:text-ink hover:border-stone"
                  }`}
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
