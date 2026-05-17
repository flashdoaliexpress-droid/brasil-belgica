import { useEffect, useState } from "react";
import { news } from "../data/news";
import type { NewsItem } from "../types";
import { useLanguage } from "../i18n/LanguageContext";

function formatDate(iso: string, locale: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function NewsRowCard({
  item,
  onOpen,
  readMoreLabel,
  dateLocale,
}: {
  item: NewsItem;
  onOpen: (slug: string) => void;
  readMoreLabel: string;
  dateLocale: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="group bg-white border border-hairline hover:border-brand-navy/30 hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onOpen(item.slug)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onOpen(item.slug);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <div className="sm:col-span-5 relative aspect-[16/10] sm:aspect-auto overflow-hidden bg-stone/10">
          {imgError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-brand-navy/20 text-6xl">
                article
              </span>
            </div>
          ) : (
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              onError={() => setImgError(true)}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <span className="absolute top-3 left-3 font-label-md text-label-md text-white bg-brand-navy px-2.5 py-1 uppercase tracking-wider">
            {item.category}
          </span>
        </div>

        <div className="sm:col-span-7 p-6 md:p-8 flex flex-col justify-center">
          <p className="font-label-md text-label-md text-dust uppercase tracking-widest mb-3">
            {formatDate(item.date, dateLocale)}
          </p>
          <h3 className="font-headline-md text-headline-md md:text-headline-lg md:font-headline-lg text-ink uppercase leading-tight group-hover:text-brand-navy transition-colors">
            {item.title}
          </h3>
          <p className="font-body-md text-body-md text-stone mt-3 line-clamp-2">
            {item.excerpt}
          </p>
          <span className="font-label-lg text-label-lg text-brand-navy uppercase tracking-widest mt-4 inline-flex items-center gap-2 group-hover:text-brand-navy transition-colors">
            {readMoreLabel}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </span>
        </div>
      </div>
    </article>
  );
}

function NewsDetail({
  item,
  onBack,
  backToAllLabel,
  publishedOnLabel,
  dateLocale,
}: {
  item: NewsItem;
  onBack: () => void;
  backToAllLabel: string;
  publishedOnLabel: string;
  dateLocale: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <main className="bg-page-alt min-h-screen pt-32 pb-section-gap">
      <div className="max-w-4xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 font-label-lg text-label-lg uppercase tracking-widest text-brand-navy hover:text-brand-navy transition-colors mb-8"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          {backToAllLabel}
        </button>

        <article>
          <span className="inline-block font-label-md text-label-md text-white bg-brand-navy px-2.5 py-1 uppercase tracking-wider mb-4">
            {item.category}
          </span>

          <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-ink uppercase leading-none mb-4">
            {item.title}
          </h1>

          <p className="font-label-lg text-label-lg text-dust uppercase tracking-widest mb-10">
            {publishedOnLabel} {formatDate(item.date, dateLocale)}
          </p>

          <div className="relative aspect-[16/9] bg-stone/10 mb-10 overflow-hidden">
            {imgError ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-brand-navy/20 text-7xl">
                  article
                </span>
              </div>
            ) : (
              <img
                src={item.image}
                alt={item.title}
                onError={() => setImgError(true)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>

          <p className="font-body-lg text-body-lg text-brand-navy font-bold mb-6">
            {item.excerpt}
          </p>

          <div className="font-body-lg text-body-lg text-stone space-y-5">
            {(item.content ?? "").split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      </div>
    </main>
  );
}

interface Props {
  onClose: () => void;
  initialSlug?: string | null;
}

export function NoticiasPage({ onClose, initialSlug }: Props) {
  const { t } = useLanguage();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug ?? null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [selectedSlug]);

  useEffect(() => {
    setSelectedSlug(initialSlug ?? null);
  }, [initialSlug]);

  const selected = selectedSlug ? news.find((n) => n.slug === selectedSlug) : null;

  if (selected) {
    return (
      <NewsDetail
        item={selected}
        onBack={() => setSelectedSlug(null)}
        backToAllLabel={t.news.backToAll}
        publishedOnLabel={t.news.publishedOn}
        dateLocale={t.dateLocale}
      />
    );
  }

  return (
    <main className="bg-page min-h-screen pt-32 pb-section-gap">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 font-label-lg text-label-lg uppercase tracking-widest text-brand-navy hover:text-brand-navy transition-colors mb-8"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          {t.news.backToSite}
        </button>

        <header className="mb-12 max-w-3xl">
          <div className="w-12 h-[3px] bg-brand-navy mb-6" aria-hidden="true" />
          <h1 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl uppercase leading-none">
            <span className="text-ink">{t.news.allNewsTitle}</span>{" "}
            <span className="text-brand-navy">{t.news.allNewsTitleHighlight}</span>
          </h1>
          <p className="font-body-lg text-body-lg text-stone mt-6">
            {t.news.allNewsSubtitle}
          </p>
        </header>

        <div className="space-y-6">
          {news.map((n) => (
            <NewsRowCard key={n.id} item={n} onOpen={setSelectedSlug} readMoreLabel={t.news.readMore} dateLocale={t.dateLocale} />
          ))}
        </div>
      </div>
    </main>
  );
}
