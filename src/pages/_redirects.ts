import type { APIRoute } from "astro";
import siteSettings from "../content/settings/site.json";

type RedirectItem = {
  from?: string;
  to?: string;
  status?: string;
};

function normalizeRedirects() {
  const redirects = Array.isArray(siteSettings.redirects)
    ? (siteSettings.redirects as RedirectItem[])
    : [];

  return redirects
    .filter((item) => item.from && item.to)
    .map((item) => {
      const status = item.status || "301";
      return `${item.from} ${item.to} ${status}`;
    });
}

export const GET: APIRoute = () => {
  const lines = normalizeRedirects();

  return new Response(`${lines.join("\n")}${lines.length ? "\n" : ""}`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};

