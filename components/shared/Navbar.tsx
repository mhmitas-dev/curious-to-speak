import { Suspense } from "react";
import AuthButton from "../AuthButton";

const Navbar = async () => {

    return (
        <nav className="w-full border-b border-border bg-card/80 backdrop-blur z-10">
            <div className="custom-container flex items-center justify-between">
                <div className="">
                    <button className='text-xl font-semibold'>Curious2Talk</button>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <AuthButton />
                </Suspense>
            </div>
        </nav>
    );
};

export default Navbar;