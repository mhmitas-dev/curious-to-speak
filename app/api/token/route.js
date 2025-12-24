import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const room = req.nextUrl.searchParams.get('room');
    const name = req.nextUrl.searchParams.get('name');

    if (!room || !name) {
        return NextResponse.json({ error: 'Missing room or name' }, { status: 400 });
    }

    // 1. Create the token
    const at = new AccessToken(
        process.env.LIVEKIT_API_KEY,
        process.env.LIVEKIT_API_SECRET,
        { identity: name }
    );

    // 2. Give the user permission to join the room and speak
    at.addGrant({ roomJoin: true, room: room, canPublish: true, canSubscribe: true });

    // 3. Return the token string
    return NextResponse.json({ token: await at.toJwt() });
}