"use client"

import { signInWithGoogle } from "@/lib/actions/google-signin.action";
import { Button } from "./ui/button";

const GoogleSignInButton = () => {
    return (
        <Button onClick={signInWithGoogle} className='p-4 bg-blue-500'>SIGN IN</Button>
    )
}

export default GoogleSignInButton