/**
 * Converte URLs do Supabase Storage para o endpoint de transformação de imagem.
 * Reduz o tamanho das imagens em ~90% sem perda visual perceptível.
 *
 * Suporte: webp automático, resize por largura, qualidade configurável.
 * O Supabase cacheia o resultado — primeira carga é gerada uma vez, depois é instantânea.
 */
const OBJECT  = "/storage/v1/object/public/";
const RENDER  = "/storage/v1/render/image/public/";

export function imgUrl(
  url: string | null | undefined,
  width    = 800,
  height?: number,
  quality  = 80
): string {
  if (!url) return "";
  if (!url.includes(OBJECT)) return url;
  const h = height ? `&height=${height}` : "";
  return (
    url.replace(OBJECT, RENDER) +
    `?width=${width}${h}&quality=${quality}&format=webp`
  );
}
