import {List} from ".prisma/client";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, X} from "lucide-react";
import {PopoverClose} from "@radix-ui/react-popover";

interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
}

export const ListOptions = ({
    data,
    onAddCard
}: ListOptionsProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='h-auto w-auto p-2' variant='ghost'>
                    <MoreHorizontal className={'h-4 w-4'}/>
                </Button>
            </PopoverTrigger>
            <PopoverContent align='start' side='bottom' className='px-0 py-3'>
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    Delete List
                </div>
                <PopoverClose asChild>
                    <Button variant='ghost' className='absolute top-2 right-2 p-2 w-auto h-auto text-neutral-600'>
                        <X className='h-4 w-4'/>
                    </Button>
                </PopoverClose>
            </PopoverContent>
        </Popover>
    )
}