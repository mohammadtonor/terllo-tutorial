'use client'
import { Board } from '@prisma/client';
import {Button} from "@/components/ui/button";
import {ElementRef, useRef, useState} from "react";
import {FormInput} from "@/components/form/form-input";
import {useAction} from "@/hooks/use-actions";
import {updateBoard} from "@/actions/update-board";
import {toast} from "sonner";
interface BoardTitleFormProps {
    data: Board;
}

export const BoardTitleForm = ({
    data
}: BoardTitleFormProps) => {
    const { execute } = useAction(updateBoard, {
        onSuccess: (data) => {
            toast.success(`Board "${data.title}" updated!`);
            disableEditing();
            setTitle(data.title);
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const inputRef = useRef<ElementRef<'input'>>(null)
    const formRef = useRef<ElementRef<'form'>>(null);

    const [title, setTitle] = useState(data.title)
    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.select();
        })

    }

    const disableEditing = () => {
        setIsEditing(false)
    }
    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as  string;

        execute({
            title,
            id: data.id
        })
    }


    const onBlur = () => {
        formRef.current?.requestSubmit();
    };

    if (isEditing) {
        return (
            <form action={onSubmit} ref={formRef} className='flex items-center gap-x-2'>
                <FormInput
                    id='title'
                    ref={inputRef}
                    onBlur={onBlur}
                    defaultValue={title}
                    className='text-lg font-bold bg-transparent px-[7px] py-1 h-7
                    focus-visible:outline-none focus-visible:ring-transparent'
                />
            </form>
        )
    }
    return (
        <Button
            onClick={enableEditing}
            variant='transparent'
            className='font-bold text-lg h-auto w-auto p-1 px-2'
        >
            {data.title}
        </Button>
    )
}