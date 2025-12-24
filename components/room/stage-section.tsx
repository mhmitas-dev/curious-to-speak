"use client"

import { MicOff, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useUserRole } from "@/lib/context/user-role-context"

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
    participantBoxExpanded: boolean
}

export function StageSection({ host, guests, participantBoxExpanded }: StageSectionProps) {
    const onStage = [host, ...guests]
    // const onStage = [host, ...guests, ...guests, ...guests, ...guests, ...guests, ...guests, guests[0]]
    const { userRole: currentUserRole } = useUserRole()

    return (
        <div className={cn("px-4 pb-3 pt-5 overflow-y-scroll nice-scrollbar", participantBoxExpanded ? "max-h-64" : "max-h-6", "transition-[max-height] duration-300 ease-in")}>
            <div className="flex flex-wrap items-center justify-center gap-3 pb-2">
                {onStage.map((participant) => (
                    <SpeakerCard
                        key={participant.id}
                        participant={participant}
                        canManage={currentUserRole === "host"}
                    />
                ))}
            </div>
        </div>
    )
}

export function SpeakerCard({
    participant,
    canManage,
}: {
    participant: Participant
    canManage: boolean
}) {
    const [isHovered, setIsHovered] = useState(false)
    const isSpeaking = participant.is_speaking
    const isMuted = participant.voice_state === "muted"

    return (
        <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <div
                className={cn(
                    "relative size-24 overflow-hidden transition-all duration-300  rounded-sm shadow-md shadow-primary/10",
                )}
            >
                {/* Full-coverage Avatar - Removed rounded-full from Avatar to make it rectangular */}
                <Avatar className="w-full h-full rounded-sm">
                    <AvatarImage
                        src={`https://placehold.co/600x400/orange/white?text=${participant.full_name.charAt(0).toUpperCase()}`}
                        alt={participant.full_name}
                        className="object-cover"
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-4xl">
                        {participant.full_name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/40" />

                <div
                    className={cn(
                        "absolute inset-0 flex flex-col items-center justify-center gap-1 backdrop-blur-sm transition-opacity duration-300",
                        isHovered ? "opacity-100 bg-black/50" : "opacity-0",
                    )}
                >
                    <p className="text-sm font-semibold text-white text-center px-3 line-clamp-2">{participant.full_name}</p>
                </div>

                {/* {(participant.role === "host" || participant.role === "guest") && (
                    <div className="absolute bottom-2 left-2">
                        <span
                            className={cn(
                                "inline-flex rounded-full px-2 py-1 text-xs font-medium",
                                participant.role === "host" ? "bg-primary text-white" : "bg-accent text-white",
                            )}
                        >
                            {participant.role === "host" ? "Host" : "Guest"}
                        </span>
                    </div>
                )} */}

                <div className="absolute bottom-0 right-0">
                    {isMuted ? (
                        <div className="flex h-7 w-7 items-center justify-center rounded-none rounded-tl-sm rounded-br-sm bg-black/70">
                            <MicOff className="h-4 w-4 text-white" />
                        </div>
                    ) : (
                        <div>
                            {/* Speaking animation effect will be here */}
                        </div>
                    )}
                </div>

                {canManage && participant.role !== "host" && (
                    <div className="absolute top-2 right-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 bg-black/40 hover:bg-black/60 backdrop-blur-sm">
                                    <MoreVertical className="h-4 w-4 text-white" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                                <DropdownMenuItem className="cursor-pointer">
                                    {participant.voice_state === "muted" ? "Unmute" : "Mute"}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer">Move to Audience</DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                                    Remove
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                {/* {isSpeaking && !isMuted && (
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
                        <div className="h-1.5 w-0.5 animate-wave bg-primary rounded-full" />
                        <div className="h-2.5 w-0.5 animate-wave bg-primary rounded-full animation-delay-75" />
                        <div className="h-1.5 w-0.5 animate-wave bg-primary rounded-full animation-delay-150" />
                    </div>
                )}

                {isSpeaking && <div className="absolute -inset-1 rounded-xl border border-primary/50 pointer-events-none" />} */}
            </div>
        </div>
    )
}

