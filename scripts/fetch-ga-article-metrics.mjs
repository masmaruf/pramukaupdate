import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const output = path.join(process.cwd(), "src/data/article-metrics.json");

function base64url(input) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function readCredentials() {
  if (credentialsPath) {
    return JSON.parse(fs.readFileSync(path.resolve(credentialsPath), "utf8"));
  }

  const clientEmail = process.env.GA_CLIENT_EMAIL;
  const privateKey = process.env.GA_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (clientEmail && privateKey) {
    return { client_email: clientEmail, private_key: privateKey };
  }

  throw new Error(
    "Credential GA belum ada. Isi GOOGLE_APPLICATION_CREDENTIALS atau GA_CLIENT_EMAIL + GA_PRIVATE_KEY.",
  );
}

async function getAccessToken(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: credentials.client_email,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const unsigned = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(claim))}`;
  const signature = crypto
    .createSign("RSA-SHA256")
    .update(unsigned)
    .sign(credentials.private_key, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const assertion = `${unsigned}.${signature}`;
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    throw new Error(`Gagal mengambil token GA: ${response.status} ${await response.text()}`);
  }

  const json = await response.json();
  return json.access_token;
}

async function fetchArticleMetrics(token) {
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: process.env.GA_START_DATE || "90daysAgo", endDate: "today" }],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: {
          filter: {
            fieldName: "pagePath",
            stringFilter: { matchType: "BEGINS_WITH", value: "/artikel/" },
          },
        },
        limit: 250,
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gagal membaca laporan GA: ${response.status} ${await response.text()}`);
  }

  const report = await response.json();
  const articles = {};

  for (const row of report.rows ?? []) {
    const pagePath = row.dimensionValues?.[0]?.value ?? "";
    const views = Number(row.metricValues?.[0]?.value ?? 0);
    const match = pagePath.match(/^\/artikel\/([^/?#]+)\/?$/);
    if (!match || !views) continue;

    const slug = decodeURIComponent(match[1]);
    articles[slug] = {
      ...(articles[slug] ?? {}),
      views: (articles[slug]?.views ?? 0) + views,
    };
  }

  return articles;
}

if (!propertyId) {
  throw new Error("GOOGLE_ANALYTICS_PROPERTY_ID belum diisi.");
}

const credentials = readCredentials();
const token = await getAccessToken(credentials);
const articles = await fetchArticleMetrics(token);

fs.writeFileSync(
  output,
  `${JSON.stringify({ updatedAt: new Date().toISOString(), source: "google-analytics-data-api", articles }, null, 2)}\n`,
);

console.log(`Berhasil mengambil ${Object.keys(articles).length} metrik artikel dari Google Analytics Data API.`);
