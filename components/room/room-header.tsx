"use client"

import { LogOut, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { redirect, useRouter } from "next/navigation"

interface RoomHeaderProps {
    roomName: string
}

export function RoomHeader({ roomName, }: RoomHeaderProps) {
    const router = useRouter()

    return (
        <header className="grid gap-2 sm:grid-cols-3 py-2 sm:py-0 sm:h-16 border-b border-border bg-card px-6">
            <div className="flex gap-4">
                <div className="flex items-center sm:justify-start gap-3">
                    <h1 className="text-md font-semibold text-foreground">{roomName}</h1>
                </div>
            </div>
            <div className="flex items-center sm:justify-center gap-2">
                <Button disabled size="icon">
                    <MicOff className="size-5" />
                </Button>
            </div>
            <div className="flex items-center sm:justify-end gap-2">
                <Button onClick={() => router.push("/app")} variant="destructive" className="cursor-pointer" size="sm">
                    <LogOut className="size-4 mr-2" />
                    Leave Room
                </Button>
            </div>
        </header>
    )
}
