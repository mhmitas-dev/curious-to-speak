'use client';

import { useState, useEffect, useRef } from 'react';
import AgoraRTC, {
    IAgoraRTCClient,
    IMicrophoneAudioTrack
} from 'agora-rtc-sdk-ng';
import { Button } from './ui/button';

export default function VoiceCall() {
    const [isJoined, setIsJoined] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Store references (not state, because we don't need re-renders for these)
    const clientRef = useRef<IAgoraRTCClient | null>(null);
    const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);

    // Replace these with your actual values from Agora Console
    const APP_ID = '70aa9c97011e4e79bfc7f2a4e6a4f205'
    const CHANNEL = 'test-channel'
    const TOKEN = '007eJxTYNh/wOzWiXVHQi+f+xt9P/ez4ZWLqyL2f0s6wbBsysMLxmsKFBjMDRITLZMtzQ0MDVNNUs0tk9KSzdOMEk1SzRJN0owMTE2YfDIbAhkZDFwqmRkZIBDE52EoSS0u0U3OSMzLS81hYAAA3yQlzg=='

    // Initialize the Agora client when component mounts
    useEffect(() => {
        // Create the client
        clientRef.current = AgoraRTC.createClient({
            mode: 'rtc',  // 'rtc' mode is for normal communication
            codec: 'vp8'   // Video codec (we still need this even for audio-only)
        });

        // Set up event listeners
        setupEventListeners();

        // Cleanup when component unmounts
        return () => {
            leaveChannel();
        };
    }, []);

    // Listen for when other users publish audio
    const setupEventListeners = () => {
        if (!clientRef.current) return;

        // When someone else publishes audio
        clientRef.current.on('user-published', async (user, mediaType) => {
            // Subscribe to their audio
            await clientRef.current!.subscribe(user, mediaType);
            console.log('Subscribed to user:', user.uid);

            // If it's audio, play it
            if (mediaType === 'audio') {
                const remoteAudioTrack = user.audioTrack;
                remoteAudioTrack?.play(); // This plays the audio through your speakers
            }
        });

        // When someone leaves or stops publishing
        clientRef.current.on('user-unpublished', (user) => {
            console.log('User unpublished:', user.uid);
        });
    };

    // Join the channel
    const joinChannel = async () => {
        if (!clientRef.current) return;

        setIsLoading(true);
        try {
            // 1. Join the channel
            await clientRef.current.join(APP_ID, CHANNEL, TOKEN, null);
            console.log('Joined channel successfully');

            // 2. Create your microphone audio track
            localAudioTrackRef.current = await AgoraRTC.createMicrophoneAudioTrack();
            console.log('Created microphone track');

            // 3. Publish your audio so others can hear you
            await clientRef.current.publish([localAudioTrackRef.current]);
            console.log('Published audio successfully');

            setIsJoined(true);
        } catch (error) {
            console.error('Error joining channel:', error);
            alert('Failed to join channel. Check console for details.');
        } finally {
            setIsLoading(false);
        }
    };

    // Leave the channel
    const leaveChannel = async () => {
        if (!clientRef.current) return;

        setIsLoading(true);
        try {
            // Stop and close the microphone track
            if (localAudioTrackRef.current) {
                localAudioTrackRef.current.close();
                localAudioTrackRef.current = null;
            }

            // Leave the channel
            await clientRef.current.leave();
            console.log('Left channel successfully');

            setIsJoined(false);
        } catch (error) {
            console.error('Error leaving channel:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Agora Voice Call</h2>

            <div style={{ marginTop: '20px' }}>
                {!isJoined ? (
                    <Button
                        onClick={joinChannel}
                        disabled={isLoading}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isLoading ? 'Joining...' : 'Join Call'}
                    </Button>
                ) : (
                    <button
                        onClick={leaveChannel}
                        disabled={isLoading}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: isLoading ? 'not-allowed' : 'pointer',
                            backgroundColor: '#ff4444',
                            color: 'white'
                        }}
                    >
                        {isLoading ? 'Leaving...' : 'Leave Call'}
                    </button>
                )}
            </div>

            <div style={{ marginTop: '20px' }}>
                <p>Status: {isJoined ? '🟢 In Call' : '🔴 Not Connected'}</p>
                <p>Channel: {CHANNEL}</p>
            </div>
        </div>
    );
}