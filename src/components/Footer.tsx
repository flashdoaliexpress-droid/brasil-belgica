import { club } from "../data/club";

const INSTAGRAM_URL =
  "https://www.instagram.com/brasil_belgica10?igsh=MWJpc2VzNmJ1ejdnaA%3D%3D";
const WHATSAPP_URL =
  "https://api.whatsapp.com/send/?phone=32491744200&text&type=phone_number&app_absent=0&utm_source=ig";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-container-padding-mobile md:px-container-padding-desktop py-section-gap max-w-7xl mx-auto gap-10">
        <div className="flex flex-col items-center md:items-start gap-4">
          <img
            src="/images/logo-header.webp"
            alt="Brasil Bélgica F.C."
            className="h-14 w-auto"
            loading="lazy"
          />
          <p className="font-body-md text-body-md text-white/70 text-center md:text-left max-w-sm uppercase">
            © {year} {club.name} F.C. — A força do futebol amador.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Instagram do Brasil Bélgica"
            className="group flex items-center gap-3 px-5 py-3 border border-white/20 hover:border-secondary-fixed transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              className="fill-white group-hover:fill-secondary-fixed transition-colors"
              aria-hidden="true"
            >
              <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.804.249 2.227.413.56.218.96.478 1.38.898.42.42.68.82.898 1.38.164.423.36 1.057.413 2.227.058 1.266.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.249 1.804-.413 2.227a3.72 3.72 0 0 1-.898 1.38c-.42.42-.82.68-1.38.898-.423.164-1.057.36-2.227.413-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.804-.249-2.227-.413a3.72 3.72 0 0 1-1.38-.898 3.72 3.72 0 0 1-.898-1.38c-.164-.423-.36-1.057-.413-2.227C2.212 15.584 2.2 15.205 2.2 12s.012-3.584.07-4.85c.054-1.17.249-1.804.413-2.227.218-.56.478-.96.898-1.38.42-.42.82-.68 1.38-.898.423-.164 1.057-.36 2.227-.413C8.416 2.212 8.795 2.2 12 2.2zm0-2.2C8.741 0 8.332.014 7.052.072 5.775.131 4.902.333 4.14.63a5.92 5.92 0 0 0-2.14 1.393A5.92 5.92 0 0 0 .63 4.14C.333 4.902.131 5.775.072 7.052.014 8.332 0 8.741 0 12s.014 3.668.072 4.948c.06 1.277.261 2.15.558 2.912a5.92 5.92 0 0 0 1.39 2.14 5.92 5.92 0 0 0 2.14 1.392c.762.297 1.635.5 2.912.558C8.332 23.986 8.741 24 12 24s3.668-.014 4.948-.072c1.277-.06 2.15-.261 2.912-.558a5.92 5.92 0 0 0 2.14-1.392 5.92 5.92 0 0 0 1.392-2.14c.297-.762.5-1.635.558-2.912.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.06-1.277-.261-2.15-.558-2.912a5.92 5.92 0 0 0-1.392-2.14A5.92 5.92 0 0 0 19.86.63C19.098.333 18.225.131 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
            <span className="font-label-lg text-label-lg text-white group-hover:text-secondary-fixed transition-colors">
              INSTAGRAM
            </span>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="WhatsApp do Brasil Bélgica"
            className="group flex items-center gap-3 px-5 py-3 border border-white/20 hover:border-secondary-fixed transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              className="fill-white group-hover:fill-secondary-fixed transition-colors"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            <span className="font-label-lg text-label-lg text-white group-hover:text-secondary-fixed transition-colors">
              WHATSAPP
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
