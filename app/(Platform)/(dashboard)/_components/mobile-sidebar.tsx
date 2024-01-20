'use client';

import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

import {useMobileSidebar} from "@/hooks/useMobileSidebar";
import {Button} from "@/components/ui/button";
import {Menu} from "lucide-react";
import {Sheet, SheetContent} from "@/components/ui/sheet";
import {Sidebar} from "@/app/(Platform)/(dashboard)/_components/sidebar";

export const MobileSidebar = () => {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const {onOpen, isOpen} = useMobileSidebar();
    const onClose = useMobileSidebar((state) => state.onClose);

    useEffect(() => {
        setIsMounted(true)
    }, []);

    useEffect(() => {
        onClose();
    }, [onClose, pathname]);

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Button
                onClick={onOpen}
                className='block md:hidden'
                size='icon'
                variant='ghost'
            >
                <Menu className='w-4 h-4'/>
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent
                    side='left'
                    className='p-2 pt-10 w-80'
                >
                    <Sidebar
                        storageKey='t-sidebar-mobile-state'
                    />
                </SheetContent>
            </Sheet>
        </>
    );
};