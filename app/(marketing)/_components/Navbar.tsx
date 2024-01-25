import {Logo} from "@/components/logo";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {UserButton} from "@clerk/nextjs";


export const Navbar = () => {
    return (
        <div className='fixed w-full h-14 bg-white items-center border-b
            hadow-sm px-4 top-0 flex'>
            <div className='md:max-w-screen-2xl mx-auto w-full justify-between items-center flex'>
                <Logo/>
                <div className="space-x-4 md:block md:w-auto flex w-full items-center justify-between">
                    <Button size='sm' variant='outline' asChild>
                        <Link href='/sign-in'>Login</Link>
                    </Button>
                    <Button size='sm' asChild>
                        <Link href='/sign-up'>
                            Get Taskify for free
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};