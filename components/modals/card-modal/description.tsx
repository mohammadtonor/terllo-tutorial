'use client'

import {CardWithList} from "@/types";
import {Skeleton} from "@/components/ui/skeleton";
import {AlignLeft} from "lucide-react";
import {useParams} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {ElementRef, useRef, useState} from "react";
import {useEventListener, useOnClickOutside} from "usehooks-ts";
import {FormTextarea} from "@/components/form/form-textarea";
import {FormButton} from "@/components/form/form-button";
import {Button} from "@/components/ui/button";
import {useAction} from "@/hooks/use-actions";
import {updateCard} from "@/actions/update-card";
import {toast} from "sonner";

interface DescriptionProps {
    data: CardWithList;
}

export const Description = ({
    data
}: DescriptionProps) => {
    const params = useParams();
    const queryClient = useQueryClient();

    const [isEditing, setIsEditing] = useState(false);

    const formRef = useRef<ElementRef<'form'>>(null);
    const textAreaRef = useRef<ElementRef<'textarea'>>(null);

    const enableEditing = () => {
        setIsEditing(true);
        setTimeout(() => {
            textAreaRef.current?.focus();
        })
    }

    const disableEditing = () => {
        setIsEditing(false);
    }

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing();
        }
    }

    useEventListener('keydown', onKeyDown);
    useOnClickOutside(formRef, disableEditing);

    const {execute, fieldErrors} = useAction(updateCard, {
        onSuccess: data => {
            queryClient.invalidateQueries({
                queryKey: ['card', data.id]
            });

            queryClient.invalidateQueries({
                queryKey: ['card-logs', data.id]
            })

            toast.success(`Card "${data.title}" updated`);
            disableEditing()
        },
        onError: error => {
            toast.error(error);
        }
    })

    const onSubmit = (formData: FormData) => {
        const description = formData.get('description') as string;
        const boardId = params.boardId as string;

        execute({
            id: data.id,
            description,
            boardId,
        })
    }

    return (
        <div className='flex items-start gap-x-3 w-full'>
            <AlignLeft className='h-5 w-5 mr-0.5 text-neutral-700' />
            <div className='w-full'>
                <p className='font-semibold text-neutral-700 mb-2'>
                    Description
                </p>
                {isEditing ? (
                    <form
                        action={onSubmit}
                        ref={formRef}
                        className='space-y-1'>
                        <FormTextarea
                            id={'description'}
                            ref={textAreaRef}
                            label={'Description'}
                            placeholder={'Add a description to your card..'}
                            errors={fieldErrors}
                        />
                        <div className='flex items-center gap-x-2'>
                            <FormButton>
                                Save
                            </FormButton>
                            <Button
                                type='button'
                                onClick={disableEditing}
                                variant='ghost'
                                size='sm'
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div
                        onClick={enableEditing}
                        role='button'
                        className='min-h-[78px] bg-neutral-200 px-3.5 text-sm font-medium py-3 rounded-md'
                    >
                        {data.description || "Add a more detailed description..."}
                    </div>
                )}
            </div>
        </div>
    )
}

Description.Skeleton = function DescriptionSkeleton() {
    return (
        <div className='flex items-start gap-x-3 w-full'>
            <Skeleton className='w-6 h-6 bg-neutral-200'/>
            <div className='w-full'>
                <Skeleton className='w-24 h-6 mb-2 bg-neutral-200'/>
                 <Skeleton className='w-full h-[78px] bg-neutral-200'/>
            </div>
        </div>
    )
}
