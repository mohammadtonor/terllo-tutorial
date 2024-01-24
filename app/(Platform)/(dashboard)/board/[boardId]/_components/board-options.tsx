'use client'

import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, X} from "lucide-react";
import {useAction} from "@/hooks/use-actions";
import {deleteBoard} from "@/actions/delete-board";
import {toast} from "sonner";
import {PopoverClose} from "@radix-ui/react-popover";

interface BoardOptionsProps  {
    id: string;
}

export const BoardOptions = ({
    id
}: BoardOptionsProps) => {
    const { execute, isLoading} = useAction( deleteBoard, {
        onError: (error) => {
            toast.error(error)
        }
    })

    const onDelete = () => {
        execute({id})
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='h-auto w-auto p-2' variant='transparent'>
                    <MoreHorizontal className='h-4 w-4'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className='px-0 pt-3 pb-3'
                side='bottom'
                align='start'
            >
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    Board Action
                </div>
                <PopoverClose asChild>
                    <Button
                        variant='ghost'
                        className=' p-2 absolute top-2 right-2 w-auto h-auto'
                    >
                        <X className='h-4 w-4'/>
                    </Button>
                </PopoverClose>
                <Button
                    variant='ghost'
                    className='rounded-none w-full h-full p-2 px-5 justify-start font-normal text-sm'
                    onClick={onDelete}
                    disabled={isLoading}
                >
                    Delete this board
                </Button>
            </PopoverContent>
        </Popover>
    );
};