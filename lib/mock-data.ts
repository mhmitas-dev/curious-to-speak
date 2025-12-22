// Types matching your schema
export type Profile = {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    email: string;
    created_at: string;
}

export type Room = {
    id: string;
    host_id: string;
    state: 'active' | 'locked' | 'expired';
    last_active_at: string;
    created_at: string;
    title: string; // Added for UI
}

export type RoomParticipant = {
    id: string;
    room_id: string;
    user_id: string;
    role: 'host' | 'guest' | 'audience';
    presence: 'present' | 'absent' | 'removed';
    voice_state: 'can_speak' | 'muted' | 'cannot_speak';
    joined_at: string;
    last_seen_at: string;
    profile: Profile; // Joined data
}

export type RoomMessage = {
    id: string;
    room_id: string;
    sender_id: string;
    content: string;
    created_at: string;
    sender: Profile; // Joined data
}

// Mock join requests (real-time, not persisted)
export type JoinRequest = {
    id: string;
    user_id: string;
    requested_at: string;
    profile: Profile;
}