"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Message {
    id: string
    sender: {
        username: string
        full_name: string
    }
    content: string
    created_at: string
}

interface ChatSectionProps {
    messages: Message[]
    currentUserRole: "host" | "guest" | "audience"
}

export function ChatSection({ messages, currentUserRole }: ChatSectionProps) {
    const [newMessage, setNewMessage] = useState("")

    const handleSendMessage = () => {
        if (!newMessage.trim()) return
        console.log("[v0] Sending message:", newMessage)
        setNewMessage("")
    }

    const getRoleLabel = (role: "host" | "guest" | "audience"): string => {
        if (role === "host") return "Host"
        if (role === "guest") return "Guest"
        return ""
    }

    return (
        <div className="flex h-full flex-col">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className="flex gap-2">
                            <Avatar className="h-7 w-7 mt-1 flex-shrink-0">
                                <AvatarImage
                                    src={`/.jpg?height=32&width=32&query=${message.sender.username}`}
                                    alt={message.sender.full_name}
                                />
                                <AvatarFallback className="text-xs">{message.sender.full_name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-sm font-medium text-foreground truncate">{message.sender.full_name}</span>
                                        {message.sender.full_name === "Sarah Chen" && (
                                            <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs font-medium text-primary">Host</span>
                                        )}
                                    </div>
                                    <span className="text-xs text-muted-foreground">{formatMessageTime(message.created_at)}</span>
                                </div>
                                <p className="mt-1 text-sm text-foreground leading-relaxed break-words">{message.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-border p-3">
                <div className="flex gap-2">
                    <Input
                        placeholder="Send a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                handleSendMessage()
                            }
                        }}
                        className="flex-1 text-sm"
                    />
                    <Button onClick={handleSendMessage} size="icon" className="flex-shrink-0">
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

function formatMessageTime(timestamp: string): string {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)

    if (diffInMinutes < 1) return "just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
}
