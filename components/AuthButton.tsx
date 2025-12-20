import { createClient } from '@/lib/supabase/server'
import GoogleSignInButton from './GoogleSignInButton'
import LogoutButton from './LogoutButton'

const AuthButton = async () => {
    const supabase = await createClient()
    const { data } = await supabase.auth.getClaims()
    const user = data?.claims;

    return user ? (
        <div className="space-y-4">
            <div>
                Hey, {user.email}!
            </div>
            <LogoutButton />
            <div>
                <pre>
                    {JSON.stringify(data.claims, null, 2)}
                </pre>
            </div>
        </div>
    ) : (
        <GoogleSignInButton />
    )
}

export default AuthButton