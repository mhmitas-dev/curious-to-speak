// Mock data for UI demonstration
export const mockRoom = {
    id: "1",
    name: "Product Design Discussion",
    totalParticipants: 47,
    onStageCount: 5,
}

export const mockParticipants = {
    host: {
        id: "1",
        username: "sarah_chen",
        full_name: "Sarah Chen",
        avatar_url: "/diverse-woman-portrait.png",
        role: "host" as const,
        voice_state: "can_speak" as const,
        is_speaking: true,
    },
    guests: [
        {
            id: "2",
            username: "john_doe",
            full_name: "John Doe",
            avatar_url: "/man.jpg",
            role: "guest" as const,
            voice_state: "can_speak" as const,
            is_speaking: false,
        },
        {
            id: "3",
            username: "emily_watson",
            full_name: "Emily Watson",
            avatar_url: "/woman-2.jpg",
            role: "guest" as const,
            voice_state: "muted" as const,
            is_speaking: false,
        },
        {
            id: "4",
            username: "mike_johnson",
            full_name: "Mike Johnson",
            avatar_url: "/man-2.jpg",
            role: "guest" as const,
            voice_state: "can_speak" as const,
            is_speaking: true,
        },
    ],
    audience: Array.from({ length: 42 }, (_, i) => ({
        id: `audience-${i + 1}`,
        username: `user_${i + 1}`,
        full_name: `User ${i + 1}`,
        avatar_url: `/placeholder.svg?height=32&width=32&query=person-${i}`,
        role: "audience" as const,
        presence: "present" as const,
    })),
}

export const mockMessages = [
    {
        id: "1",
        sender: { username: "alex_smith", full_name: "Alex Smith" },
        content: "Great discussion! Really enjoying the insights.",
        created_at: new Date(Date.now() - 300000).toISOString(),
    },
    {
        id: "2",
        sender: { username: "lisa_wang", full_name: "Lisa Wang" },
        content: "Can we talk about the mobile experience next?",
        created_at: new Date(Date.now() - 240000).toISOString(),
    },
    {
        id: "3",
        sender: { username: "david_kim", full_name: "David Kim" },
        content: "I have a question about the design system we discussed",
        created_at: new Date(Date.now() - 180000).toISOString(),
    },
    {
        id: "4",
        sender: { username: "alex_smith", full_name: "Alex Smith" },
        content: "Great discussion! Really enjoying the insights.",
        created_at: new Date(Date.now() - 300000).toISOString(),
    },
    {
        id: "5",
        sender: { username: "lisa_wang", full_name: "Lisa Wang" },
        content: "Can we talk about the mobile experience next?",
        created_at: new Date(Date.now() - 240000).toISOString(),
    },
    {
        id: "6",
        sender: { username: "david_kim", full_name: "David Kim" },
        content: "I have a question about the design system we discussed",
        created_at: new Date(Date.now() - 180000).toISOString(),
    },
    {
        id: "7",
        sender: { username: "alex_smith", full_name: "Alex Smith" },
        content: "Great discussion! Really enjoying the insights.",
        created_at: new Date(Date.now() - 300000).toISOString(),
    },
    {
        id: "8",
        sender: { username: "lisa_wang", full_name: "Lisa Wang" },
        content: "Can we talk about the mobile experience next?",
        created_at: new Date(Date.now() - 240000).toISOString(),
    },
    {
        id: "9",
        sender: { username: "david_kim", full_name: "David Kim" },
        content: "I have a question about the design system we discussed",
        created_at: new Date(Date.now() - 180000).toISOString(),
    },
]