import Navbar from '@/components/shared/Navbar';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    const user = data?.claims;

    if (!user) {
        redirect("/")
    }

    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}

export default layout