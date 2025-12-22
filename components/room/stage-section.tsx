"use client"

import { Mic, MicOff, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface Participant {
    id: string
    username: string
    full_name: string
    avatar_url: string
    role: "host" | "guest"
    voice_state: "can_speak" | "muted" | "cannot_speak"
    is_speaking?: boolean
}

interface StageSectionProps {
    host: Participant
    guests: Participant[]
    currentUserRole: "host" | "guest" | "audience"
}

export function StageSection({ host, guests, currentUserRole }: StageSectionProps) {
    const onStage = [host, ...guests]

    return (
        <div className="px-4 py-3">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium text-muted-foreground">ON STAGE</h2>
                <span className="text-xs text-muted-foreground">{onStage.length}/20</span>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
                {onStage.map((participant) => (
                    <SpeakerCard key={participant.id} participant={participant} canManage={currentUserRole === "host"} />
                ))}
            </div>
        </div>
    )
}

function SpeakerCard({
    participant,
    canManage,
}: {
    participant: Participant
    canManage: boolean
}) {
    const isSpeaking = participant.is_speaking
    const isMuted = participant.voice_state === "muted"

    return (
        <div
            className={cn(
                "relative flex flex-col items-center gap-2 rounded-lg bg-secondary/50 p-3 transition-all min-w-[120px]",
                isSpeaking && "ring-2 ring-primary ring-offset-2 ring-offset-background",
            )}
        >
            {isSpeaking && <div className="absolute inset-0 rounded-lg bg-primary/10 animate-pulse" />}

            <div className="relative">
                <Avatar className="h-14 w-14">
                    <AvatarImage src={participant.avatar_url || "/placeholder.svg"} alt={participant.full_name} />
                    <AvatarFallback>{participant.full_name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div
                    className={cn(
                        "absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background",
                        isMuted ? "bg-muted" : "bg-primary",
                    )}
                >
                    {isMuted ? (
                        <MicOff className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                        <Mic className="h-3.5 w-3.5 text-primary-foreground" />
                    )}
                </div>

                {isSpeaking && !isMuted && (
                    <div className="absolute -right-2 top-0 flex items-center gap-0.5">
                        <div className="h-2 w-0.5 animate-wave bg-primary rounded-full" />
                        <div className="h-3 w-0.5 animate-wave bg-primary rounded-full delay-75" />
                        <div className="h-2 w-0.5 animate-wave bg-primary rounded-full delay-150" />
                    </div>
                )}
            </div>

            <div className="flex flex-col items-center text-center w-full">
                <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-foreground truncate max-w-[90px]">{participant.full_name}</p>
                    {participant.role === "host" && (
                        <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs font-medium text-primary">Host</span>
                    )}
                    {participant.role === "guest" && (
                        <span className="rounded bg-accent/20 px-1.5 py-0.5 text-xs font-medium text-accent-foreground">Guest</span>
                    )}
                </div>
                <p className="text-xs text-muted-foreground truncate max-w-[100px]">@{participant.username}</p>
            </div>

            {canManage && participant.role !== "host" && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 absolute top-2 right-2">
                            <MoreVertical className="h-3.5 w-3.5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>{participant.voice_state === "muted" ? "Unmute" : "Mute"}</DropdownMenuItem>
                        <DropdownMenuItem>Move to Audience</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}
