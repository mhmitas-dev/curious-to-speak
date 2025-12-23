"use client"

import { Button } from "@/components/ui/button"

interface RoleSelectorProps {
    currentRole: "host" | "guest" | "audience"
    onRoleChange: (role: "host" | "guest" | "audience") => void
}

export function RoleSelector({ currentRole, onRoleChange }: RoleSelectorProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-2 px-6 py-2 border-b border-border bg-card">
            <span className="text-sm text-muted-foreground">Demo Role:</span>
            <Button
                variant={currentRole === "host" ? "default" : "ghost"}
                size="sm"
                onClick={() => onRoleChange("host")}
                className="h-8"
            >
                Host
            </Button>
            <Button
                variant={currentRole === "guest" ? "default" : "ghost"}
                size="sm"
                onClick={() => onRoleChange("guest")}
                className="h-8"
            >
                Guest
            </Button>
            <Button
                variant={currentRole === "audience" ? "default" : "ghost"}
                size="sm"
                onClick={() => onRoleChange("audience")}
                className="h-8"
            >
                Audience
            </Button>
        </div>
    )
}
