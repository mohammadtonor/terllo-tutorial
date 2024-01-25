'use client'

import {useEffect, useState} from "react";
import {ListWithCards} from "@/types";
import {ListForm} from "@/app/(Platform)/(dashboard)/board/[boardId]/_components/ListForm";
import {ListItem} from './list-item';
import {DragDropContext, Droppable} from "@hello-pangea/dnd";

interface ListContainerProps {
    data: ListWithCards[],
    boardId: string;
}

function reorder<T> (list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0 , removed);

    return result;
}

export const ListContainer = ({
    data,
    boardId,
}: ListContainerProps) => {
    const [orderedData, setOrderedDate] = useState(data);

    useEffect(() => {
        setOrderedDate(data);
    }, [orderedData]);

    const onDragEnd = () => {

    }

    return (
        <DragDropContext onDragEnd={() => {}}>
            <Droppable droppableId='lists' type='list' direction='horizontal'>
                {(provided) => (
                    <ol
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className='flex gap-x-3 h-full'>
                        {orderedData.map((list, index) => {
                            return (
                                <ListItem
                                    key={list.id}
                                    index={index}
                                    data={list}
                                />
                            )
                        })}
                        {provided.placeholder}
                        <ListForm />
                        <div className='flex-shrink-0 w-1'/>
                    </ol>
                )}
            </Droppable>
        </DragDropContext>
    )
}