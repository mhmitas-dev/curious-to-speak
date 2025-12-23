"use client"

import * as React from "react"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, useSidebar, } from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { Hand, LayoutGridIcon, MessageSquareIcon, Users, X } from "lucide-react"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state, setOpen } = useSidebar()
  const isCollapsed = state === "collapsed";
  const [currentTab, setCurrentTab] = React.useState<"chats" | "audiences" | "requests" | "applications">("chats");

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
    <Sidebar collapsible="icon" {...props} side="right">
      <SidebarHeader className="flex flex-row justify-between">
        {/* How to know if the sidebar is collapsed? */}
        <div className={cn("flex",
          isCollapsed ? "flex-col items-center gap-3" : "flex-row gap-3 justify-start",
        )}>
          {tabButtons.map((tab) => (
            <Button
              key={tab.id}
              variant={currentTab === tab.id ? "default" : "outline"}
              size={"icon"}
              onClick={() => {
                handleTabChange(tab.id as "chats" | "audiences" | "requests" | "applications")
                isCollapsed && setOpen(true)
              }}
            >
              <tab.icon className="size-5" />
            </Button>
          ))}
        </div>
        {!isCollapsed &&
          <Button onClick={() => setOpen(false)} variant={"ghost"} size={"icon"}><X className="size-5" /></Button>
        }
      </SidebarHeader>
      <SidebarContent className={cn("p-3 nice-scrollbar", isCollapsed && "hidden")}>
        <div>
          <p>A</p>
        </div>
        <div>
          <p>B</p>
        </div>
        <div>
          <p>C</p>
        </div>
        <div>
          <p>D</p>
        </div>
        <div>
          <p>E</p>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
