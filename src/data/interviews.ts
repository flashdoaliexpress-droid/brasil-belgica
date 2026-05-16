export interface Interview {
  id: number;
  name: string;
  video: string;
  thumbnail: string;
  position?: string;
  date?: string;
}

// Em dev usa arquivo local (public/entrevistas/); em produção usa GitHub Releases
const RELEASE =
  "https://github.com/flashdoaliexpress-droid/brasil-belgica/releases/download/videos-v1";

function v(slug: string): string {
  return import.meta.env.DEV
    ? `/entrevistas/${slug}.mp4`
    : `${RELEASE}/${slug}.mp4`;
}

export const interviews: Interview[] = [
  { id: 1,  name: "JAM",        video: v("jam"),        thumbnail: "/thumbnails/jam.webp",       position: "Meio Campo",      date: "Jan 2025" },
  { id: 2,  name: "JUNIOR",     video: v("junior"),     thumbnail: "/thumbnails/junior.webp",    position: "Atacante",        date: "Jan 2025" },
  { id: 3,  name: "MARCOS",     video: v("marcos"),     thumbnail: "/thumbnails/marcos.webp",    position: "Zagueiro",        date: "Fev 2025" },
  { id: 4,  name: "PACHECO",    video: v("pacheco"),    thumbnail: "/thumbnails/pacheco.webp",   position: "Volante",         date: "Fev 2025" },
  { id: 5,  name: "BRUNO",      video: v("bruno"),      thumbnail: "/thumbnails/bruno.webp",     position: "Lateral Direito", date: "Mar 2025" },
  { id: 6,  name: "GIL",        video: v("gil"),        thumbnail: "/thumbnails/gil.webp",       position: "Goleiro",         date: "Mar 2025" },
  { id: 7,  name: "JESSE",      video: v("jesse"),      thumbnail: "/thumbnails/jesse.webp",     position: "Atacante",        date: "Abr 2025" },
  { id: 8,  name: "KAIK",       video: v("kaik"),       thumbnail: "/thumbnails/kaik.webp",      position: "Lateral Direito", date: "Abr 2025" },
  { id: 9,  name: "LEYLSON",    video: v("leylson"),    thumbnail: "/thumbnails/leylson.webp",   position: "Volante",         date: "Mai 2025" },
  { id: 10, name: "ZONA LESTE", video: v("zona-leste"), thumbnail: "/thumbnails/zona-leste.webp", position: "Meio Campo",     date: "Mai 2025" },
];
