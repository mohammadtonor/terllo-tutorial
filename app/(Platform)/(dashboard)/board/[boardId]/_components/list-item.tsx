import {ListWithCards} from "@/types";
import {ListHeader} from "@/app/(Platform)/(dashboard)/board/[boardId]/_components/list-header";
import {useState} from "react";

interface ListItemProps {
    index: number;
    data: ListWithCards
}

export const ListItem = ({
    data,
    index
}: ListItemProps) => {
    return (
        <li className='h-full w-[272px] shrink-0  select-none'>
            <div className='w-full rounded-md shadow-md bg-[#f1f2f4] pb-2'>
                <ListHeader data={data}/>
            </div>
        </li>
    )
}