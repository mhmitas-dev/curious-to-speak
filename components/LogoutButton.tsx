"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "./ui/button"

const LogoutButton = () => {
    async function handleLogout() {
        const supabase = createClient()
        await supabase.auth.signOut()
        window.location.reload()
    }

    return (
        <Button onClickCapture={handleLogout}>Logout</Button>
    )
}

export default LogoutButton