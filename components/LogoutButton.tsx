"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

const LogoutButton = ({ className }: { className?: string }) => {
    async function handleLogout() {
        const supabase = createClient()
        await supabase.auth.signOut()
        window.location.reload()
    }

    return (
        <Button className={cn(className)} onClickCapture={handleLogout}>Logout</Button>
    )
}

export default LogoutButton