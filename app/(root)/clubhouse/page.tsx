'use client';

import {
    ControlBar,
    SessionProvider,
    useSession,
    RoomAudioRenderer,
    RoomName,
    TrackLoop,
    TrackMutedIndicator,
    useIsMuted,
    useIsSpeaking,
    useTrackRefContext,
    useTracks,
} from '@livekit/components-react';
import { Track, TokenSource } from 'livekit-client';
import { useMemo, useState, useEffect } from 'react';
import { generateRandomUserId, cn } from '@/lib/utils';
import type { NextPage } from 'next';

// shadcn/ui components
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Clubhouse: NextPage = () => {
    const params = useMemo(
        () => (typeof window !== 'undefined' ? new URLSearchParams(location.search) : null),
        [],
    );
    const roomName = params?.get('roomName') ?? 'test-room';
    const [userIdentity] = useState(() => params?.get('participantName') ?? generateRandomUserId());

    const tokenSource = TokenSource.endpoint("/api/token");
    const session = useSession(tokenSource, {
        roomName,
        participantIdentity: userIdentity,
        participantName: userIdentity,
    });

    const [tryToConnect, setTryToConnect] = useState(false);

    useEffect(() => {
        if (tryToConnect) {
            session.start({ tracks: { microphone: { enabled: true } } })
                .catch((err) => console.error(err));
        } else {
            session.end().catch((err) => console.error(err));
        }
    }, [tryToConnect, session.start, session.end]);

    return (
        <div className="relative h-screen bg-background text-foreground overflow-hidden font-sans">
            <SessionProvider session={session}>
                {/* Entry Screen */}
                {!session.isConnected && (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <h1 className="text-2xl font-semibold tracking-tight">Ready to join?</h1>
                        <Button onClick={() => setTryToConnect(true)}>
                            Join Room
                        </Button>
                    </div>
                )}

                {/* Main Clubhouse Slider */}
                <div
                    className={cn(
                        "absolute inset-x-0 bottom-0 mx-auto w-full max-w-4xl h-[85vh] bg-card border-x border-t rounded-t-xl shadow-lg transition-transform duration-500 ease-in-out flex flex-col mb-8 rounded-b-lg",
                        session.isConnected ? "translate-y-0" : "translate-y-full"
                    )}
                >
                    {/* Header */}
                    <div className="px-6 py-4 flex items-center justify-between">
                        <div className="font-semibold text-lg uppercase tracking-wider">
                            <RoomName />
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setTryToConnect(false)}>
                            Leave
                        </Button>
                    </div>

                    <Separator />

                    {/* Grid Area */}
                    <div className="flex-1 overflow-y-auto p-8">
                        <Stage />
                    </div>

                    {/* Bottom Controls */}
                    <div className="p-6 bg-muted/30 border-t flex justify-center">
                        <ControlBar
                            variation="minimal"
                            controls={{ microphone: true, camera: false, screenShare: false }}
                        />
                    </div>
                    <RoomAudioRenderer />
                </div>
            </SessionProvider>
        </div>
    );
};

const Stage = () => {
    const tracksReferences = useTracks([Track.Source.Microphone]);
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-y-10 gap-x-4 justify-items-center">
            <TrackLoop tracks={tracksReferences}>
                <CustomParticipantTile />
            </TrackLoop>
        </div>
    );
};

const CustomParticipantTile = () => {
    const trackRef = useTrackRefContext();
    const isSpeaking = useIsSpeaking(trackRef.participant);
    const isMuted = useIsMuted(trackRef);
    const id = trackRef.participant.identity;

    return (
        <section className="relative flex flex-col items-center gap-3 w-full" title={trackRef.participant.name}>
            <div className="relative">
                <Avatar
                    className={cn(
                        "h-16 w-16 md:h-20 md:w-20 ring-offset-background transition-all duration-300",
                        isSpeaking ? "ring-2 ring-ring ring-offset-4" : "ring-0"
                    )}
                >
                    <AvatarImage
                        src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=${id}`}
                        alt={id}
                    />
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {id.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                {/* Mic Status Icon */}
                {isMuted && (
                    <div className="absolute -bottom-1 -right-1 bg-background border rounded-full p-1 shadow-sm">
                        <TrackMutedIndicator className="w-3.5 h-3.5 text-muted-foreground" trackRef={trackRef} />
                    </div>
                )}
            </div>

            <span className="text-xs font-medium text-center truncate w-full px-1">
                {id}
            </span>
        </section>
    );
};

export default Clubhouse;