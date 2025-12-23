"use client"

import { MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useUserRole } from "@/lib/context/user-role-context"
import { mockParticipants } from "@/lib/mock-data"
import { SidebarContent, SidebarFooter, SidebarSeparator } from "../ui/sidebar"

export function JoinRequestSection() {
    const { userRole: currentUserRole } = useUserRole()
    const isHost = currentUserRole === "host"

    return (
        <>
            <SidebarContent className="nice-scrollbar">
                <div className="space-y-1 p-3">
                    {mockParticipants.audience.map((member) => (
                        <div
                            key={member.id}
                            className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-secondary/50 transition-colors group"
                        >
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={member.avatar_url || "/placeholder.svg"} alt={member.full_name} />
                                <AvatarFallback className="text-xs">{member.full_name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-foreground truncate">{member.full_name}</p>
                                <p className="text-xs text-muted-foreground truncate">@{member.username}</p>
                            </div>

                            {isHost && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <MoreVertical className="h-3.5 w-3.5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Invite to Stage</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Kick</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        </div>
                    ))}
                </div>
            </SidebarContent>
            <SidebarSeparator />
            <SidebarFooter>
                <p className="py-2 text-center">All Audiences</p>
            </SidebarFooter>
        </>
    )
}
