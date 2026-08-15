// Sincronização entre a URL e a "view" da SPA (o site não usa react-router).
// Permite compartilhar/recarregar links profundos de notícias, ex: /noticias/<slug>.

export type Route =
  | { view: "home" }
  | { view: "noticias"; slug: string | null }
  | { view: "apresentacoes" }
  | { view: "calendario" };

export function parseLocation(pathname: string): Route {
  const parts = pathname.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
  if (parts[0] === "noticias") {
    return { view: "noticias", slug: parts[1] ? decodeURIComponent(parts[1]) : null };
  }
  if (parts[0] === "apresentacoes") {
    return { view: "apresentacoes" };
  }
  if (parts[0] === "calendario") {
    return { view: "calendario" };
  }
  return { view: "home" };
}

export function pathFor(route: Route): string {
  switch (route.view) {
    case "noticias":
      return route.slug ? `/noticias/${encodeURIComponent(route.slug)}` : "/noticias";
    case "apresentacoes":
      return "/apresentacoes";
    case "calendario":
      return "/calendario";
    default:
      return "/";
  }
}

// Empurra a rota no histórico do navegador sem recarregar a página.
// Só empurra se o path realmente mudou (evita entradas duplicadas).
export function pushRoute(route: Route): void {
  const path = pathFor(route);
  if (window.location.pathname !== path) {
    window.history.pushState({}, "", path);
  }
}
