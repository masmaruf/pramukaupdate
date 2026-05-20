function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCallbackUrl(origin) {
  return process.env.OAUTH_CALLBACK_URL || `${origin}/api/callback`;
}

function renderHandoff({ token, error, origin }) {
  const provider = "github";
  const status = token ? "success" : "error";
  const content = token
    ? { token, provider }
    : { message: error || "OAuth failed", provider };
  const safeDisplay = token
    ? "Login GitHub berhasil. Kamu bisa menutup jendela ini."
    : `Login GitHub gagal: ${escapeHtml(content.message)}`;

  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Pramuka Update CMS Auth</title>
  </head>
  <body>
    <p>${safeDisplay}</p>
    <script>
      (function () {
        var origin = ${JSON.stringify(origin)};
        var message = ${JSON.stringify(`authorization:${provider}:${status}:`)} + ${JSON.stringify(JSON.stringify(content))};

        function receiveMessage(event) {
          if (event.origin !== origin) return;
          window.removeEventListener("message", receiveMessage, false);
          window.opener && window.opener.postMessage(message, origin);
        }

        window.addEventListener("message", receiveMessage, false);
        window.opener && window.opener.postMessage(${JSON.stringify(`authorizing:${provider}`)}, "*");
      })();
    </script>
  </body>
</html>`;
}

export default async function handler(req, res) {
  const origin = process.env.OAUTH_ORIGIN || process.env.ORIGIN || "https://pramukaupdate.id";
  const callbackUrl = getCallbackUrl(origin);
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const code = req.query?.code;

  if (!clientId || !clientSecret) {
    res
      .status(500)
      .setHeader("Content-Type", "text/html; charset=utf-8")
      .send(renderHandoff({ error: "Missing OAUTH_CLIENT_ID or OAUTH_CLIENT_SECRET", origin }));
    return;
  }

  if (!code || typeof code !== "string") {
    res
      .status(400)
      .setHeader("Content-Type", "text/html; charset=utf-8")
      .send(renderHandoff({ error: "Missing GitHub OAuth code", origin }));
    return;
  }

  try {
    const response = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: callbackUrl,
      }),
    });

    const data = await response.json();

    if (!response.ok || data.error || !data.access_token) {
      throw new Error(data.error_description || data.error || "GitHub did not return an access token");
    }

    res
      .status(200)
      .setHeader("Content-Type", "text/html; charset=utf-8")
      .send(renderHandoff({ token: data.access_token, origin }));
  } catch (error) {
    res
      .status(500)
      .setHeader("Content-Type", "text/html; charset=utf-8")
      .send(renderHandoff({ error: error instanceof Error ? error.message : "OAuth failed", origin }));
  }
}
