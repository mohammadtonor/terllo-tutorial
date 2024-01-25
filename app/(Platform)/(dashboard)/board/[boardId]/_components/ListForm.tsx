'use client'

import {ElementRef, useRef, useState} from "react";
import {toast} from "sonner";
import {useParams, useRouter} from "next/navigation";
import {useEventListener, useOnClickOutside} from "usehooks-ts";
import {useAction} from "@/hooks/use-actions";
import {Plus, X} from "lucide-react";
import {createList} from "@/actions/create-list";

import {FormButton} from "@/components/form/form-button";
import {FormInput} from "@/components/form/form-input";
import {Button} from "@/components/ui/button";
import {ListWrapper} from './ListWrapper';

export const ListForm = () => {
    const router = useRouter()
    const params = useParams();

    const formRef = useRef<ElementRef<'form'>>(null);
    const inputRef = useRef<ElementRef<'input'>>(null);

    const [isEditing, setIsEditing] = useState(false);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
        })
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const { execute, fieldErrors} = useAction(createList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" created!`);
            disableEditing();
        },
        onError: error => {
            toast.error(error);
        }
    })

    const keyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing();
        }
    }

    useEventListener('keydown', keyDown);
    useOnClickOutside(formRef, disableEditing);

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as  string;
        const boardId = formData.get('boardId') as string;

        execute({title, boardId });
    }

    if (isEditing) {
        return (
            <ListWrapper>
                <form
                    action={onSubmit}
                    className='w-full p-3 rounded-md bg-white space-y-4 shadow-md'
                    ref={formRef}
                >
                    <FormInput
                        id='title'
                        errors={fieldErrors}
                        ref={inputRef}
                        className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input
                         focus:border-input transition'
                        placeholder='Enter list title'
                    />
                    <input
                        type='hidden'
                        value={params.boardId}
                        name='boardId'
                    />
                    <div className='flex items-center gap-x-1'>
                        <FormButton variant='primary'>
                            Add List
                        </FormButton>
                        <Button
                            onClick={disableEditing}
                            size='sm'
                            variant='ghost'
                        >
                            <X className='h-5 w-5'/>
                        </Button>
                    </div>
                </form>
            </ListWrapper>
        )
    }

    return (
        <ListWrapper>
            <button
                onClick={enableEditing}
                className='w-full hover:bg-white/50 transition p-3 flex items-center
                font-medium rounded-md bg-white/80'
            >
                <Plus className='w-4 h-4 mr-2'/>
                Add a List
            </button>
        </ListWrapper>
    )
}