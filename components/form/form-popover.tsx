'use client'

import {PopoverClose} from "@radix-ui/react-popover";
import {useAction} from "@/hooks/use-actions";
import {createBoard} from "@/actions/crate-board";
import {ElementRef, useRef} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import {X} from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {Button} from "@/components/ui/button";
import {FormInput} from "@/components/form/form-input";
import {FormButton} from "@/components/form/form-button";
import {FormPicker} from "@/components/form/form-picker";
import {useProModal} from "@/hooks/use-pro-modal";

interface FormPopoverProps {
    children: React.ReactNode;
    side?: 'left' | 'right' | 'top' | 'bottom';
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
};

export const FormPopover = ({
    children,
    side,
    align,
    sideOffset
}: FormPopoverProps) => {
    const proModal = useProModal();
    const router = useRouter();
    const closeRef = useRef<ElementRef<'button'>>(null)

    const {execute, fieldErrors} = useAction( createBoard, {
        onSuccess: (data) => {
            toast.success('Board created!');
            closeRef.current?.click();
            router.push(`/board/${data.id}`);
        },
        onError: (err) => {
            toast.error(err);
            proModal.onOpen()
        }
    })

    const onSubmit = (formData: FormData) => {
        const  title = formData.get('title') as string;
        const image = formData.get('image') as string;


       execute({title, image})
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent
                align={align}
                className='w-80 pt-3'
                side={side}
                sideOffset={sideOffset}
            >
                <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
                    Create board
                </div>
                <PopoverClose ref={closeRef} asChild>
                    <Button
                        className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
                        variant='ghost'
                    >
                        <X className='h-4 w-4'/>
                    </Button>
                </PopoverClose>
                <form action={onSubmit} className='space-y-4'>
                    <div className='space-y-4'>
                        <FormPicker id='image' errors={fieldErrors}/>
                        <FormInput
                            id='title'
                            label='Board title'
                            type='text'
                            errors={fieldErrors}
                        />
                    </div>
                    <FormButton variant='primary' className='w-full'>
                        Save
                    </FormButton>
                </form>
            </PopoverContent>
        </Popover>
    )
}