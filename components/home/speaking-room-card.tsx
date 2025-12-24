"use client"

import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"

export function SpeakingRoomCard({ room }: any) {
    const router = useRouter()

    return (
        <Card className="cursor-pointer select-none" onClick={() => router.push(`/room/${room.id}`)}>
            <CardHeader>
                <p className="line-clamp-2 tracking-tight">Wintertime stories fill the air with light, With peaceful cheer and my dear online tonight.</p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2 items-center">
                    <Avatar className="size-16">
                        <AvatarImage
                            src={room.host.avatar_url || `https://placehold.co/600x400/orange/white?text=${room.host.full_name.charAt(0).toUpperCase()}`}
                            alt={room.host.full_name}
                            className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                            {room.host.full_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm text-muted-foreground uppercase">Host</p>
                        <p className="">{room.host.full_name}</p>
                    </div>
                </div>
                <Separator />
                <div className="">
                    <p className="mb-2 text-muted-foreground">Participants 8</p>
                    <div className="flex gap-2">
                        {Array.from({ length: 8 }, (_, i) => i).map((i) => <Avatar className="size-full max-w-12 max-h-12 flex-1" key={i}>
                            <AvatarImage
                                src={room.host.avatar_url || `https://placehold.co/600x400/orange/white?text=${room.host.full_name.charAt(0).toUpperCase()}`}
                                alt={room.host.full_name}
                                className="object-cover"
                            />
                            <AvatarFallback>
                                {room.host.full_name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>)}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex gap-3">
                {["English", "Spanish"].map((lang, i) => <Badge>{lang}</Badge>)}
                <Badge>Intermediate</Badge>
            </CardFooter>
        </Card>
    )
}


const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })
}