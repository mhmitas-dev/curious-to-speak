"use client"

import { RoleSelector } from "@/components/room/role-selector"
import { RoomHeader } from "@/components/room/room-header"
import { StageSection } from "@/components/room/stage-section"
import { useUserRole } from "@/lib/context/user-role-context"
import { mockParticipants, mockRoom } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function RoomPage() {
    const [participantBoxExpanded, setParticipantBoxExpanded] = useState(true)
    const { userRole: currentUserRole, setUserRole } = useUserRole()

    return (
        <div className="h-screen w-full">
            <div className="flex h-screen flex-col flex-1">
                <RoomHeader roomName={mockRoom.name} />
                {/* <RoleSelector currentRole={currentUserRole} onRoleChange={setUserRole} /> */}
                {/* Main Content - Stage Area */}
                <div className="flex flex-1 overflow-hidden">
                    <div className="flex flex-1 flex-col overflow-hidden">
                        {/* Stage Content Area - takes most space */}
                        <div className="flex flex-1 items-center justify-center bg-background/50 p-4 overflow-y-hidden">
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
                        <div className="rounded-t-lg relative">
                            {/* Centered Floating Button */}
                            <div className="flex justify-center w-full">
                                <button
                                    onClick={() => setParticipantBoxExpanded(!participantBoxExpanded)}
                                    className="px-1 py-0.5 rounded-2xl w-28 flex justify-center items-center bg-card hover:bg-card hover:text-card-foreground dark:hover:bg-card/50 border-t border-b border-border cursor-pointer mb-1.5"
                                >
                                    <ChevronDown className={cn("size-5", participantBoxExpanded || "rotate-180 transition-all duration-300")} />
                                </button>
                            </div>
                            <div className="bg-card border-t border-border rounded-t-lg">
                                <StageSection
                                    host={mockParticipants.host}
                                    guests={mockParticipants.guests}
                                    participantBoxExpanded={participantBoxExpanded}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}