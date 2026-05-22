import type { APIRoute } from "astro";
import siteSettings from "../../content/settings/site.json";

export const GET: APIRoute = () =>
  new Response(JSON.stringify({ redirects: siteSettings.redirects ?? [] }, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });

