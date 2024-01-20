import {Logo} from "@/components/logo";
import {Button} from "@/components/ui/button";
import Link from "next/link";


export const Footer = () => {
    return (
        <div className='fixed w-full bg-slate-100 items-center border-t
            hadow-sm px-4 bottom-0 flex'>
            <div className='md:max-w-screen-2xl mx-auto w-full justify-between items-center flex'>
                <Logo/>
                <div className="space-x-4 md:block md:w-auto flex w-full items-center justify-between">
                    <Button size='sm' variant='ghost' asChild>
                        <Link href='/private-policy'>
                            Private policy</Link>
                    </Button>
                    <Button size='sm' variant='ghost' asChild>
                        <Link href='/Term'>
                            Term of uses
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};