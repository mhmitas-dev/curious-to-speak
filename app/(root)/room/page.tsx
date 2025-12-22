"use client"

import { RoleSelector } from "@/components/room/role-selector"
import { RoomHeader } from "@/components/room/room-header"
import { RoomSidebar } from "@/components/room/room-sidebar"
import { StageSection } from "@/components/room/stage-section"
import { useState } from "react"

// Mock data for UI demonstration
const mockRoom = {
    id: "1",
    name: "Product Design Discussion",
    totalParticipants: 47,
    onStageCount: 5,
}

const mockParticipants = {
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

const mockMessages = [
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
]

export default function RoomPage() {
    const [currentUserRole, setCurrentUserRole] = useState<"host" | "guest" | "audience">("host")

    return (
        <div className="flex h-screen flex-col bg-background dark">
            <RoleSelector currentRole={currentUserRole} onRoleChange={setCurrentUserRole} />

            <RoomHeader roomName={mockRoom.name} />

            <div className="flex flex-1 overflow-hidden">
                <div className="flex flex-1 flex-col overflow-hidden">
                    {/* Stage Content Area - takes most space */}
                    <div className="flex flex-1 items-center justify-center bg-background/50 p-8">
                        <div className="text-center">
                            <div className="mb-4 rounded-lg border-2 border-dashed border-border bg-card/50 p-12">
                                <p className="text-lg font-medium text-muted-foreground">Stage Content Area</p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    This is where whiteboard, video, and other interactive content will appear
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Stage Participants - bottom horizontal strip */}
                    <div className="border-t border-border bg-card">
                        <StageSection
                            host={mockParticipants.host}
                            guests={mockParticipants.guests}
                            currentUserRole={currentUserRole}
                        />
                    </div>
                </div>
                {/* Main Content - Stage Area */}

                {/* Right Sidebar - Tabs for Chat and Audience */}
                <RoomSidebar messages={mockMessages} audience={mockParticipants.audience} currentUserRole={currentUserRole} />
            </div>
        </div>
    )
}