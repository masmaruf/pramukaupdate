import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const pixelId = import.meta.env.PUBLIC_FACEBOOK_PIXEL_ID || "551130505241561";
  const accessToken = import.meta.env.FACEBOOK_ACCESS_TOKEN;

  if (!accessToken) {
    return new Response(
      JSON.stringify({ error: "Meta Access Token is not configured in environment variables." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body = await request.json();
    const {
      eventName,
      eventId,
      eventSourceUrl,
      clientUserAgent,
      customData = {},
      userData = {},
    } = body;

    if (!eventName) {
      return new Response(JSON.stringify({ error: "Missing eventName in request body." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Get the client IP address and user agent
    const ipAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      clientAddress;
    const userAgent = request.headers.get("user-agent") || clientUserAgent || "";

    // Build user_data for CAPI payload
    const fbUserData = {
      client_ip_address: ipAddress,
      client_user_agent: userAgent,
      ...userData,
    };

    // Construct Conversions API Event payload
    const capiPayload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId || `evt-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          event_source_url: eventSourceUrl || request.url,
          action_source: "website",
          user_data: fbUserData,
          custom_data: {
            ...customData,
          },
        },
      ],
    };

    // Forward to Meta Graph API
    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(capiPayload),
    });

    const result = await response.json();

    return new Response(JSON.stringify(result), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
