'use client'

import {toast} from "sonner";
import {useEffect, useState} from "react";
import {ListWithCards} from "@/types";
import {ListForm} from "@/app/(Platform)/(dashboard)/board/[boardId]/_components/ListForm";
import {ListItem} from './list-item';
import {DragDropContext, Droppable} from "@hello-pangea/dnd";
import {useAction} from "@/hooks/use-actions";
import {updateListOrder} from "@/actions/update-list-order";
import {updateCardOrder} from "@/actions/update-card-order";

interface ListContainerProps {
    data: ListWithCards[],
    boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    console.log('result', result);
    const [removed] = result.splice(startIndex, 1);
    console.log(startIndex, endIndex)
    result.splice(endIndex, 0, removed);

    return result;
};

export const ListContainer = ({
    data,
    boardId,
}: ListContainerProps) => {
    const [orderedData, setOrderedData] = useState(data);

    const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
        onSuccess: data => {
            toast.success('List reordered!');
        },
        onError: error => {
            toast.error(error);
        }
    })

    const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
        onSuccess: data => {
            toast.success('Card reordered!');
        },
        onError: error => {
            toast.error(error);
        }
    })

    useEffect(() => {
        setOrderedData(data);
    }, [data]);

    const onDragEnd = (result: any) => {
        const { destination, source, type } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        if ( type === 'list') {
            const items = reorder(
                orderedData,
                source.index,
                destination.index
            ).map((item, index) => ({...item, order: index }))

            setOrderedData(items);
            executeUpdateListOrder({  items, boardId })
        }
        // User moves a card
        if ( type === 'card') {
            let newOrderData = [...orderedData];

            const sourceList =
                newOrderData.find(list => list.id === source.droppableId );

            const destList =
                newOrderData.find(list => list.id === destination.droppableId);

            if (!sourceList || !destList ) {
                return;
            }

            //check if cards exist on the sourceList
            if ( !sourceList.cards) {
                sourceList.cards = [];
            }

            // Check if cards exists on the destList
            if ( !destList.cards) {
                destList.cards = [];
            }

            // Moving the card in the same list
            if (source.droppableId === destination.droppableId ) {
                const reorderedCards =  reorder(
                    sourceList.cards,
                    source.index,
                    destination.index
                );

                reorderedCards.forEach((card, idx) => {
                    card.order = idx;
                });

                sourceList.cards = reorderedCards;

                setOrderedData(newOrderData);
                executeUpdateCardOrder({
                    boardId,
                    items: reorderedCards
                })
            } else {
                const [moveCard] = sourceList.cards.splice(source.index, 1)

                moveCard.listId = destination.droppableId;

                destList.cards.splice(destination.index, 0 , moveCard);

                sourceList.cards.forEach((card, idx) => {
                    card.order = idx
                });

                destList.cards.forEach((card, idx) => {
                    card.order = idx
                })

                setOrderedData(newOrderData);
                executeUpdateCardOrder({
                    boardId,
                    items: destList.cards
                })
            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
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