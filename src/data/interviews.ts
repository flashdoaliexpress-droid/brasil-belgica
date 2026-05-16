export interface Interview {
  id: number;
  name: string;
  video: string;
  thumbnail: string;
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
  { id: 1,  name: "PACHECO",    video: v("pacheco"),    thumbnail: "/thumbnails/pacheco.webp" },
  { id: 2,  name: "JAM",        video: v("jam"),        thumbnail: "/thumbnails/jam.webp" },
  { id: 3,  name: "JUNIOR",     video: v("junior"),     thumbnail: "/thumbnails/junior.webp" },
  { id: 4,  name: "MARCOS",     video: v("marcos"),     thumbnail: "/thumbnails/marcos.webp" },
  { id: 5,  name: "BRUNO",      video: v("bruno"),      thumbnail: "/thumbnails/bruno.webp" },
  { id: 6,  name: "GIL",        video: v("gil"),        thumbnail: "/thumbnails/gil.webp" },
  { id: 7,  name: "JESSE",      video: v("jesse"),      thumbnail: "/thumbnails/jesse.webp" },
  { id: 8,  name: "KAIK",       video: v("kaik"),       thumbnail: "/thumbnails/kaik.webp" },
  { id: 9,  name: "LEYLSON",    video: v("leylson"),    thumbnail: "/thumbnails/leylson.webp" },
  { id: 10, name: "ZONA LESTE", video: v("zona-leste"), thumbnail: "/thumbnails/zona-leste.webp" },
];
