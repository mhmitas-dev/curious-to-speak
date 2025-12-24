import { RoomSidebar } from '@/components/room/room-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React, { Suspense } from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SidebarProvider className="flex">
            <Suspense fallback={<div>Loading Sidebar...</div>}>
                <main className="flex-1">
                    {children}
                </main>
            </Suspense>
            <RoomSidebar />
        </SidebarProvider>
    )
}

export default layout