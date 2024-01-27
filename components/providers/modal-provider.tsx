'use client'

import {useEffect, useState} from "react";
import {Index} from "@/components/modals/card-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null
    }

   return (
       <>
           <Index />
       </>
   )
}