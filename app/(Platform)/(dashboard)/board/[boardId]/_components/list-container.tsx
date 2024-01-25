'use client'

import {useEffect, useState} from "react";
import {ListWithCards} from "@/types";
import {ListForm} from "@/app/(Platform)/(dashboard)/board/[boardId]/_components/ListForm";
import {ListItem} from './list-item';

interface ListContainerProps {
    data: ListWithCards[],
    boardId: string;
}

export const ListContainer = ({
    data,
    boardId,
}: ListContainerProps) => {
    const [orderedData, setOrderedDate] = useState(data);

    useEffect(() => {
        setOrderedDate(data);
    }, [orderedData]);

    return (
        <ol className='flex gap-x-3 h-full'>
            {orderedData.map((list, index) => {
                return (
                    <ListItem
                        key={list.id}
                        index={index}
                        data={list}
                    />
                )
            })}
            <ListForm />
            <div className='flex-shrink-0 w-1'/>
        </ol>
    )
}