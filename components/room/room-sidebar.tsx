"use client"

import * as React from "react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, SidebarSeparator, useSidebar, } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Hand, LayoutGridIcon, MessageSquareIcon, Users, X } from "lucide-react"
import { Button } from "../ui/button"
import { ChatSection } from "./chat-section"
import { AudienceSection } from "./audience-section"
import { SettingsSection } from "./settings-section"
import { useUserRole } from "@/lib/context/user-role-context"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { JoinRequestSection } from "./join-request-section"

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


export function RoomSidebar() {
    const { state, setOpen } = useSidebar()
    const isCollapsed = state === "collapsed";
    const [currentTab, setCurrentTab] = React.useState<"chats" | "audiences" | "requests" | "applications">("chats");
    const { userRole: currentUserRole } = useUserRole()
    const tabButtons = [
        { id: "chats", label: "Chats", icon: MessageSquareIcon },
        { id: "audiences", label: "Audiences", icon: Users },
        { id: "requests", label: "Requests", icon: Hand },
        { id: "applications", label: "Applications", icon: LayoutGridIcon },
    ];

    const handleTabChange = (tab: "chats" | "audiences" | "requests" | "applications") => {
        setCurrentTab(tab);
    };

    return (
        <Sidebar collapsible="icon" side="right">
            <SidebarHeader className="flex flex-row justify-between items-center">
                <div
                    className={cn(
                        "flex py-2",
                        isCollapsed
                            ? "flex-col items-center gap-1.5"
                            : "flex-row gap-3 justify-start"
                    )}
                >
                    {tabButtons.map((tab, idx) => (
                        <React.Fragment key={tab.id}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={currentTab === tab.id ? "default" : "outline"}
                                        size="icon"
                                        onClick={() => {
                                            handleTabChange(
                                                tab.id as "chats" | "audiences" | "requests" | "applications"
                                            )
                                            if (isCollapsed) setOpen(true)
                                        }}
                                    >
                                        <tab.icon className="size-5" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{tab.label}</p>
                                </TooltipContent>
                            </Tooltip>

                            {isCollapsed && idx < tabButtons.length - 1 && (
                                <SidebarSeparator className="my-2" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {!isCollapsed && (
                    <Button
                        onClick={() => setOpen(false)}
                        variant="ghost"
                        size="icon"
                    >
                        <X className="size-5" />
                    </Button>
                )}
            </SidebarHeader>

            <SidebarSeparator className={cn(
                isCollapsed && "hidden"
            )} />
            {/* Message Area */}
            {!isCollapsed && currentTab === "chats" &&
                <ChatSection />
            }
            {/* Audience Area */}
            {!isCollapsed && currentTab === "audiences" &&
                <AudienceSection />
            }
            {/* Requests Area */}
            {!isCollapsed && currentTab === "requests" &&
                <JoinRequestSection />
            }
            {/* Application Area */}
            {!isCollapsed && currentTab === "applications" &&
                <SettingsSection />
            }
            <SidebarRail />
        </Sidebar >
    )
}
