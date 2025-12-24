"use client";

import { useEffect, useState } from "react";
import { LocalAudioTrack, Room, RoomEvent, createLocalAudioTrack } from "livekit-client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
    const [connected, setConnected] = useState(false);
    const [participants, setParticipants] = useState<string[]>([]);
    const [localTrack, setLocalTrack] = useState<LocalAudioTrack | null>(null);
    const [muted, setMuted] = useState(true);

    const toggleMute = () => {
        if (!localTrack) return;

        if (muted) {
            localTrack.unmute();
        } else {
            localTrack.mute();
        }

        setMuted(!muted);
    };

    useEffect(() => {
        const joinRoom = async () => {
            // Fetch token from your API route
            const token = await fetch("/api/token").then((res) => res.text());

            // Create a new LiveKit room
            const room = new Room();

            // Handle participants joining
            // When a new participant joins
            room.on(RoomEvent.ParticipantConnected, (p) => {
                setParticipants((prev) => [...prev, p.identity]);
            });

            // When a participant leaves
            room.on(RoomEvent.ParticipantDisconnected, (p) => {
                setParticipants((prev) => prev.filter((id) => id !== p.identity));
            });

            // Handle new audio tracks
            room.on(RoomEvent.TrackSubscribed, (track) => {
                const audioEl = document.getElementById("remote-audio") as HTMLAudioElement;
                track.attach(audioEl);
            });

            // Connect to the room using the token
            await room.connect("ws://localhost:7880", token);

            // Publish local microphone
            const audioTrack = await createLocalAudioTrack();
            await room.localParticipant.publishTrack(audioTrack);
            setLocalTrack(audioTrack);

            setParticipants([
                room.localParticipant.identity,
                ...Array.from(room.remoteParticipants.values()).map(p => p.identity)
            ]);

            setConnected(true);
        };

        joinRoom();
    }, []);

    console.log(participants)

    return (
        <div style={{ padding: 20 }}>
            <h1>LiveKit Audio Room</h1>
            {connected ? <p>Connected!</p> : <p>Connecting…</p>}
            <audio id="remote-audio" autoPlay />
            <div className="my-10">
                {participants.map((id) => (
                    <Card className="bg-card" key={id}>
                        <CardContent>
                            <CardTitle>{id}</CardTitle>
                            <div>
                                <Button onClick={toggleMute}>{muted ? "Unmute" : "Mute"} (Me)</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

        </div>
    );
}
