"use client";

import { useState } from 'react';
import {
    LiveKitRoom,
    RoomAudioRenderer,
    useTracks
} from '@livekit/components-react';
import { Track } from 'livekit-client';

export default function ManualJoinTest() {
    const [token, setToken] = useState("");
    const [joined, setJoined] = useState(false);

    async function handleJoin() {
        const res = await fetch('/api/token?room=test&name=user1');
        const data = await res.json();
        setToken(data.token);
        setJoined(true);
    }

    if (!joined) {
        return (
            <div style={{ padding: '50px' }}>
                <button
                    onClick={handleJoin}
                    style={{ padding: '10px 20px', fontSize: '20px', cursor: 'pointer' }}
                >
                    Join the Club
                </button>
            </div>
        );
    }

    return (
        <LiveKitRoom
            token={token}
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
            // This 'connectLiveKit' setting ensures the mic starts immediately
            connect={true}
            audio={true}
            video={false}
        >
            <RoomAudioRenderer />
            <div style={{ padding: '20px', border: '2px solid black' }}>
                <h1>Status: Inside Room</h1>
                <LocalSpeakerIndicator />
            </div>
        </LiveKitRoom>
    );
}

function LocalSpeakerIndicator() {
    // We added 'includePlaceholder: true' so even if the mic fails, 
    // we see the participant name on the screen.
    const tracks = useTracks(
        [{ source: Track.Source.Microphone, attach: true }],
        { onlySubscribed: false } // This ensures we see OURSELVES too
    );

    return (
        <div style={{ marginTop: '20px' }}>
            <h2>People in Room: {tracks.length}</h2>
            {tracks.length === 0 && <p>Searching for microphone tracks...</p>}

            {tracks.map((t) => (
                <div key={t.participant.identity} style={{ fontSize: '24px', margin: '10px 0' }}>
                    <strong>{t.participant.identity}</strong>:
                    {t.participant.isSpeaking ? (
                        <span style={{ color: 'green' }}> Speaking now! 🔊</span>
                    ) : (
                        <span style={{ color: 'gray' }}> Silent 🤐</span>
                    )}
                </div>
            ))}
        </div>
    );
}