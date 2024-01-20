import {Medal} from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";
import {Poppins} from 'next/font/google';

import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";


const headingFonts = localFont({
    src: "../../public/fonts/font.woff2"
})

const textFonts = Poppins({
    subsets: ['latin'],
    weight: [
        "100",
        "200",
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
    ]
})
const MarketingPage = () => {
    return (
        <div className={'flex items-center justify-center flex-col'}>
            <div className={cn(
                `flex items-center justify-center flex-col`,
                headingFonts.className
            )}>
                <div
                    className={'mb-4 flex items-center justify-center uppercase bg-amber-100 text-amber-700 p-4 rounded-full '}>
                    <Medal className={'h-6 w-6 mr-2 '}/>
                    No 1 task managment
                </div>
                <h1 className='text-3xl md:text-6xl text-center text-neutral-800'>
                    Taskify helps team move
                </h1>
                <div
                    className='text-3xl md:text-6xl bg-gradient-to-r mt-4 from-fuchsia-600 w-fit to-pink-600 text-white px-4 p-2 rounded-md '>
                    Work froward.
                </div>
            </div>
            <div className={cn(
                "text-sm md:text-xl text-neutral-400 text-center mt-4 mx-auto md:max-w-2xl max-w-xs",
                textFonts.className
            )}>
                Collaborate, manage projects, and reach new productivity
                peaks. From high rises to the home office, the way your team
                works is unique - accomplish it all with Taskify.
            </div>

            <Button className='mt-4'>
                <Link href='/'>Get Taskify for free</Link>
            </Button>
        </div>
    );
};
export default MarketingPage;
