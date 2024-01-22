'use client'

import {createBoard} from "@/actions/crate-board";
import {useAction} from "@/hooks/use-actions";

import {FormInput} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/form-input";
import {FormButton} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/form-button";

export const Form = () => {
    const {execute, fieldErrors} = useAction(createBoard, {
        onSuccess: (data)=> {
            console.log(data, 'Success!')
        },
        onError: (err) => {
            console.log(err, 'Error!');
        }
    })

    const onSubmit = (formData: FormData) => {
        const title = formData.get('title') as string;

        execute({ title });
    }
    return (
        <form action={onSubmit}>
            <div className='flex flex-col space-y-2'>
               <FormInput errors={fieldErrors}/>
            </div>
           <FormButton />
        </form>
    );
};