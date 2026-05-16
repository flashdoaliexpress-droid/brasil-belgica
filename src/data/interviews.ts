export interface Interview {
  id: number;
  name: string;
  video: string;
  thumbnail: string;
}

const RELEASE = "https://github.com/flashdoaliexpress-droid/brasil-belgica/releases/download/videos-v1";

export const interviews: Interview[] = [
  { id: 1,  name: "PACHECO",    video: `${RELEASE}/pacheco.mp4`,    thumbnail: "/thumbnails/pacheco.webp" },
  { id: 2,  name: "JAM",        video: `${RELEASE}/jam.mp4`,        thumbnail: "/thumbnails/jam.webp" },
  { id: 3,  name: "JUNIOR",     video: `${RELEASE}/junior.mp4`,     thumbnail: "/thumbnails/junior.webp" },
  { id: 4,  name: "MARCOS",     video: `${RELEASE}/marcos.mp4`,     thumbnail: "/thumbnails/marcos.webp" },
  { id: 5,  name: "BRUNO",      video: `${RELEASE}/bruno.mp4`,      thumbnail: "/thumbnails/bruno.webp" },
  { id: 6,  name: "GIL",        video: `${RELEASE}/gil.mp4`,        thumbnail: "/thumbnails/gil.webp" },
  { id: 7,  name: "JESSE",      video: `${RELEASE}/jesse.mp4`,      thumbnail: "/thumbnails/jesse.webp" },
  { id: 8,  name: "KAIK",       video: `${RELEASE}/kaik.mp4`,       thumbnail: "/thumbnails/kaik.webp" },
  { id: 9,  name: "LEYLSON",    video: `${RELEASE}/leylson.mp4`,    thumbnail: "/thumbnails/leylson.webp" },
  { id: 10, name: "ZONA LESTE", video: `${RELEASE}/zona-leste.mp4`, thumbnail: "/thumbnails/zona-leste.webp" },
];
