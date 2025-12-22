"use client"

import { useState } from "react"
import { MessageSquare, Users, Settings } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChatSection } from "@/components/room/chat-section"
import { AudienceSection } from "@/components/room/audience-section"
import { SettingsSection } from "@/components/room/settings-section"

interface Message {
    id: string
    sender: { username: string; full_name: string }
    content: string
    created_at: string
}

interface AudienceMember {
    id: string
    username: string
    full_name: string
    avatar_url: string
    presence: "present" | "absent" | "removed"
}

interface RoomSidebarProps {
    messages: Message[]
    audience: AudienceMember[]
    currentUserRole: "host" | "guest" | "audience"
}

export function RoomSidebar({ messages, audience, currentUserRole }: RoomSidebarProps) {
    const [activeTab, setActiveTab] = useState("chat")

    return (
        <div className="flex w-80 flex-col border-l border-border bg-card">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex h-full flex-col">
                <div className="border-b border-border px-2 py-2">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="chat" className="gap-2">
                            <MessageSquare className="h-4 w-4" />
                            Chat
                        </TabsTrigger>
                        <TabsTrigger value="audience" className="gap-2">
                            <Users className="h-4 w-4" />
                            Audience ({audience.length})
                        </TabsTrigger>
                        <TabsTrigger value="settings" className="gap-2">
                            <Settings className="h-4 w-4" />
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="chat" className="mt-0 flex-1 overflow-hidden">
                    <ChatSection messages={messages} currentUserRole={currentUserRole} />
                </TabsContent>

                <TabsContent value="audience" className="mt-0 flex-1 overflow-hidden">
                    <AudienceSection audience={audience} currentUserRole={currentUserRole} />
                </TabsContent>

                <TabsContent value="settings" className="mt-0 flex-1 overflow-hidden">
                    <SettingsSection />
                </TabsContent>
            </Tabs>
        </div>
    )
}
