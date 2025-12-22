"use client"

import { ScrollArea } from "@/components/ui/scroll-area"

export function SettingsSection() {
    return (
        <div className="flex flex-1 flex-col overflow-hidden h-full">
            <ScrollArea className="flex-1">
                <div className="space-y-4 p-4">
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-3">Room Settings</h3>
                        <p className="text-xs text-muted-foreground">Room settings will be available here</p>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}
