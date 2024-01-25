import {ElementRef, forwardRef, KeyboardEventHandler, useRef} from "react";
import {Button} from "@/components/ui/button";
import {Plus, X} from "lucide-react";
import {FormTextarea} from "@/components/form/form-textarea";
import {FormButton} from "@/components/form/form-button";
import {useAction} from "@/hooks/use-actions";
import {createCard} from "@/actions/create-card";
import {toast} from "sonner";
import {useParams} from "next/navigation";
import {useEventListener, useOnClickOutside} from "usehooks-ts";

interface CardFormProps {
    listId: string;
    isEditing: boolean;
    enableEditing: () => void;
    disableEditing: () => void;
}

export const CardForm =forwardRef<HTMLTextAreaElement, CardFormProps>( ({
    listId,
    isEditing,
    enableEditing,
    disableEditing,
}, ref) => {
    const params = useParams();
    const formRef = useRef<ElementRef<'form'>>(null);

    const {execute , fieldErrors} = useAction(createCard, {
        onSuccess: data => {
            toast.success(`Card "${data.title}" created`)
            formRef.current?.reset();
        },
        onError: error => {
            toast.error(error);
        }
    })

    const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            disableEditing()
        }
    }

    useOnClickOutside(formRef, disableEditing);
    useEventListener('keydown', onKeyDown);

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            formRef.current?.requestSubmit();
        }
    }

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;
        const boardId = params.boardId as string;
        const listId = formData.get('listId') as string;

        execute({
            title,
            boardId,
            listId
        })
    }

    if (isEditing) {
        return (
            <form
                action={onSubmit}
                ref={formRef}
                className='space-y-1'>
                <FormTextarea
                    id='textarea'
                    label='textarea'
                    ref={ref}
                    onKeyDown={onTextareaKeyDown}
                    placeholder='Enter a title for this card'
                    errors={fieldErrors}
                />
                <input
                    hidden
                    id='listId'
                    name='listId'
                    value={listId}
                />
                <div className='flex items-center gap-x-1'>
                    <FormButton variant={'primary'}>
                        Add card..
                    </FormButton>
                    <Button onClick={disableEditing} variant='ghost' size='sm'>
                        <X className='w-4 h-4'/>
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <div className='pt-2 px-2' >
            <Button
                onClick={enableEditing}
                className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm'
                size='sm'
                variant='ghost'
            >
                <Plus className='h-4 w-4 mr-2'/>
                Add to card
            </Button>
        </div>
    )
})

CardForm.displayName = 'CardForm'