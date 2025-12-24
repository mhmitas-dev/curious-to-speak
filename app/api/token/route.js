import { AccessToken } from "livekit-server-sdk";

export async function GET() {
    // Dev mode keys from your LiveKit server
    const apiKey = "devkey";
    const apiSecret = "secret";

    // Create a random identity for each user
    const identity = "user-" + Math.floor(Math.random() * 100000);

    const at = new AccessToken(apiKey, apiSecret, { identity });

    at.addGrant({
        roomJoin: true,
        room: "demo-room",
    });

    const token = await at.toJwt();

    return new Response(token, {
        headers: { "Content-Type": "text/plain" },
    });
}
