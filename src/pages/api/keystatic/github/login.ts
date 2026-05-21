import type { APIRoute } from "astro";

export const prerender = false;

const keystaticRouteRegex = /^branch\/[^]+(\/collection\/[^/]+(|\/(create|item\/[^/]+))|\/singleton\/[^/]+)?$/;

function bytesToHex(bytes: Uint8Array) {
  return [...bytes].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function getPublicOrigin(request: Request) {
  const url = new URL(request.url);
  const configuredOrigin = import.meta.env.KEYSTATIC_PUBLIC_URL || import.meta.env.PUBLIC_SITE_URL;

  if (configuredOrigin) {
    return configuredOrigin.replace(/\/$/, "");
  }

  if (import.meta.env.PROD) {
    return "https://pramukaupdate.id";
  }

  return url.origin;
}

function serializeCookie(name: string, value: string) {
  return `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=86400; HttpOnly; SameSite=Lax`;
}

export const GET: APIRoute = ({ request }) => {
  const clientId = import.meta.env.KEYSTATIC_GITHUB_CLIENT_ID;

  if (!clientId) {
    return Response.redirect(new URL("/keystatic/setup", request.url), 307);
  }

  const requestUrl = new URL(request.url);
  const rawFrom = requestUrl.searchParams.get("from");
  const from = typeof rawFrom === "string" && keystaticRouteRegex.test(rawFrom) ? rawFrom : "/";
  const origin = getPublicOrigin(request);
  const githubUrl = new URL("https://github.com/login/oauth/authorize");

  githubUrl.searchParams.set("client_id", clientId);
  githubUrl.searchParams.set("redirect_uri", `${origin}/api/keystatic/github/oauth/callback`);

  if (from === "/") {
    return Response.redirect(githubUrl.toString(), 307);
  }

  const state = bytesToHex(crypto.getRandomValues(new Uint8Array(10)));
  githubUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 307,
    headers: {
      Location: githubUrl.toString(),
      "Set-Cookie": serializeCookie(`ks-${state}`, from),
    },
  });
};
