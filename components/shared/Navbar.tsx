import { Suspense } from "react";
import AuthButton from "../AuthButton";
import Image from "next/image";

const Navbar = async () => {

    return (
        <nav className="w-full border-b border-border bg-card/80 backdrop-blur z-10">
            <div className="custom-container flex items-center justify-between">
                <div className="">
                    <button className='text-xl font-semibold flex items-center gap-1'>
                        <Image
                            src={"/images/6880091.png"}
                            width={25}
                            height={25}
                            alt="C2T"
                            className="rounded-sm shadow-sm shadow-primary/10"
                        />
                        <span>Curious2Talk</span>
                    </button>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <AuthButton />
                </Suspense>
            </div>
        </nav>
    );
};

export default Navbar;