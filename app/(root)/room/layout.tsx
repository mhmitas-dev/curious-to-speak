import { RoomSidebar } from '@/components/room/room-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SidebarProvider className="flex">
            <main className="flex-1">
                {children}
            </main>
            <RoomSidebar />
        </SidebarProvider>
    )
}

export default layout