import {Card} from ".prisma/client";
import {Draggable} from "@hello-pangea/dnd";

interface CardItemProps {
    index: number;
    data: Card;
}

export const CardItem = ({
    index,
    data
}: CardItemProps) => {
    return (
        <Draggable draggableId={data.id} index={index}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    role='button'
                    className='truncate border-2 border-transparent hover:border-black
                     py-2 px-3 text-sm text-white rounded-md shadow-sm'
                >
                    {data.title}
                </div>
            )}
        </Draggable>
    )
}