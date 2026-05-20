function getOrigin(req) {
  return process.env.OAUTH_ORIGIN || process.env.ORIGIN || "https://pramukaupdate.id";
}

export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;

  if (!clientId) {
    res.status(500).send("Missing OAUTH_CLIENT_ID");
    return;
  }

  const origin = getOrigin(req);
  const callbackUrl = process.env.OAUTH_CALLBACK_URL || `${origin}/api/callback`;
  const scopes = process.env.OAUTH_SCOPES || "repo,user";
  const state = Math.random().toString(36).slice(2);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: callbackUrl,
    scope: scopes,
    state,
  });

  res.writeHead(302, {
    Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
  });
  res.end();
}
