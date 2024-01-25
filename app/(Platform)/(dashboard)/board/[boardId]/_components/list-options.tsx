import {List} from ".prisma/client";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {MoreHorizontal, X} from "lucide-react";
import {PopoverClose} from "@radix-ui/react-popover";
import {FormButton} from "@/components/form/form-button";
import {Separator} from "@/components/ui/separator";
import {useAction} from "@/hooks/use-actions";
import {deleteList} from "@/actions/delete-list";
import {toast} from "sonner";
import {ElementRef, useRef} from "react";

interface ListOptionsProps {
    data: List;
    onAddCard: () => void;
}

export const ListOptions = ({
    data,
    onAddCard
}: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null)

    const { execute: executeDelete} = useAction(deleteList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" deleted`);
            closeRef.current?.click();
        },
        onError: error => {
            toast.error(error)
        }
    })

    const { execute: executeCopy} = useAction(deleteList, {
        onSuccess: data => {
            toast.success(`List "${data.title}" copied`);
            closeRef.current?.click();
        },
        onError: error => {
            toast.error(error)
        }
    })

    const onDelete = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        executeDelete({id, boardId});
    }

    const onCopy = (formData: FormData) => {
        const id = formData.get('id') as string;
        const boardId = formData.get('boardId') as string;

        executeCopy({id, boardId});
    }

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
                <PopoverClose ref={closeRef} asChild>
                    <Button variant='ghost' className='absolute top-2 right-2 p-2 w-auto h-auto text-neutral-600'>
                        <X className='h-4 w-4'/>
                    </Button>
                </PopoverClose>
                <Button
                    onClick={onAddCard}
                    className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                    variant='ghost'
                >
                    Add card...
                </Button>
                <form action={onCopy}>
                    <input hidden name='id' id='id' value={data.id}/>
                    <input hidden name='boardId' id='boardId' value={data.id}/>
                    <FormButton
                        variant='ghost'
                        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                    >
                        Copy list...
                    </FormButton>
                </form>
                <Separator/>
                <form action={onDelete}>
                    <input hidden name='id' id='id' value={data.id}/>
                    <input hidden name='boardId' id='boardId' value={data.id}/>
                    <FormButton
                        variant='ghost'
                        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
                    >
                        Delete list...
                    </FormButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}