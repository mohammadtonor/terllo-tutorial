'use client'

import {toast} from "sonner";
import {ElementRef, useRef, useState} from "react";
import {useParams} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {useAction} from "@/hooks/use-actions";
import {updateCard} from "@/actions/update-card";
import {Layout} from "lucide-react";
import {CardWithList} from "@/types";

import {FormInput} from "@/components/form/form-input";
import {Skeleton} from "@/components/ui/skeleton";

interface HeaderProps {
    data: CardWithList;
}

export const Header = ({
    data
}: HeaderProps) => {
    const queryClient = useQueryClient();
    const params = useParams();

    const [title, setTitle] = useState(data.title)

    const inputRef = useRef<ElementRef<'input'>>(null);

    const { execute } = useAction(updateCard, {
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["card", data.id]
            });

            queryClient.invalidateQueries({
                queryKey: ["card-logs", data.id]
            });


            toast.success(`Renamed to "${data.title}"`);
            setTitle(data.title);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

   const onBlur =  () => {
       inputRef.current?.form?.requestSubmit()
   }

   const onSubmit = (formData: FormData) => {
       const newTitle = formData.get('title') as string;
       const boardId = params.boardId as string;

       if ( newTitle === data.title ){
           return
       }

       execute({
           title: newTitle,
           boardId,
           id: data.id
       })
   }

    return (
        <div className='flex items-start gap-x-3 mb-3 w-full'>
            <Layout className='h-5 w-5 mt-1 text-neutral-700'/>
            <div className='w-full'>
                <form action={onSubmit}>
                    <FormInput
                        id='title'
                        onBlur={onBlur}
                        ref={inputRef}
                        defaultValue={title}
                        className='font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent
                        relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate'
                    />
                </form>
            </div>
        </div>
    )
}

Header.Skeleton = function HeaderSkeleton () {
    return (
        <div className='flex items-start gap-x-3'>
            <Skeleton className={'h-6 w-6 mt-1 bg-neutral-200'}/>
            <div>
                <Skeleton className='w-24 h-6 mb-1 bg-neutral-200'/>
                <Skeleton className='w-12 h-4 bg-neutral-200'/>
            </div>
        </div>

    )
}