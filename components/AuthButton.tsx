import { createClient } from '@/lib/supabase/server'
import GoogleSignInButton from './GoogleSignInButton'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from '@supabase/supabase-js'
import Image from 'next/image'
import { getAvatarInitials } from '@/lib/utils'
import LogoutButton from './LogoutButton'

const AuthButton = async () => {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    return user ? (
        <ProfileMenu user={user} />
    ) : (
        <GoogleSignInButton />
    )
}

export default AuthButton;

function ProfileMenu({ user }: { user: User }) {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{getAvatarInitials(user.user_metadata?.full_name)}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="sm:w-56">
                    <div>
                        <div>
                            <div className="size-24 my-4 mb-2 rounded-full overflow-hidden mx-auto">
                                <Image
                                    className=""
                                    src={user.user_metadata?.avatar_url || ""}
                                    alt="Avatar"
                                    width={96}
                                    height={96}
                                />
                            </div>
                            {/* <div className="avatar-fallback">
                                {getAvatarInitials(user?.user_metadata?.full_name)}
                            </div> */}
                            <div className="p-2 text-muted-foreground text-xs">
                                <p>Name: {user.user_metadata?.full_name}</p>
                                <p>Email: {user.email}</p>
                            </div>
                        </div>
                    </div>
                    <DropdownMenuSeparator />
                    {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogoutButton className='w-full' />
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}