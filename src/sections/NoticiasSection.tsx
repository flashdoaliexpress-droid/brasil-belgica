import { useState } from "react";
import { useNews } from "../hooks/useNews";
import type { NewsItem } from "../types";
import { useInView } from "../hooks/useInView";
import { useLanguage } from "../i18n/LanguageContext";

function formatDate(iso: string, locale: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function NewsCard({
  item,
  large = false,
  dateLocale,
}: {
  item: NewsItem;
  large?: boolean;
  dateLocale: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="group flex flex-col h-full cursor-pointer">
      <div
        className={`relative overflow-hidden bg-stone/10 mb-4 ${
          large ? "aspect-[16/10]" : "aspect-[16/9]"
        }`}
      >
        {imgError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0120F9]/5">
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
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <span className="absolute top-3 left-3 text-[11px] font-bold text-white bg-brand-navy px-2.5 py-1 uppercase tracking-wider">
          {item.category}
        </span>
      </div>

      <p className="text-[11px] font-medium text-dust uppercase tracking-widest mb-2">
        {formatDate(item.date, dateLocale)}
      </p>
      <h3
        className={`font-headline-md text-headline-md text-ink uppercase leading-tight group-hover:text-brand-navy transition-colors ${
          large ? "md:text-headline-lg md:font-headline-lg" : ""
        }`}
      >
        {item.title}
      </h3>
      {large && (
        <p className="text-xs font-light text-stone mt-3 leading-relaxed">{item.excerpt}</p>
      )}
    </article>
  );
}

interface Props {
  onOpenAll: () => void;
  onOpenItem: (slug: string) => void;
}

export function NoticiasSection({ onOpenAll, onOpenItem }: Props) {
  const { t } = useLanguage();
  const { news } = useNews();
  const featured = news.find((n) => n.featured) ?? news[0];
  const rest = news.filter((n) => n.id !== featured?.id).slice(0, 2);
  const { ref: titleRef, inView: titleVisible } = useInView();

  return (
    <section id="noticias" className="bg-page-alt w-full py-section-gap">
      <div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop">
        <div
          ref={titleRef}
          className={`flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 transition-all duration-700 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
        >
          <div>
            <div className="space-y-1.5 mb-4">
              <div className="w-12 h-[3px] bg-[#0120F9]" />
              <div className="w-7 h-[2px] bg-brand-yellow" />
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-ink uppercase leading-none">
              {t.news.title}
            </h2>
            <div className="space-y-1.5 mt-4">
              <div className="w-7 h-[2px] bg-brand-yellow" />
              <div className="w-12 h-[3px] bg-[#0120F9]" />
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAll}
            className="self-start md:self-auto inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-navy hover:text-ink transition-colors group"
          >
            {t.news.seeAll}
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter md:gap-10">
          <div className="lg:col-span-7" onClick={() => onOpenItem(featured.slug)}>
            <NewsCard item={featured} large dateLocale={t.dateLocale} />
          </div>
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-gutter md:gap-10">
            {rest.map((n) => (
              <div key={n.id} onClick={() => onOpenItem(n.slug)}>
                <NewsCard item={n} dateLocale={t.dateLocale} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
