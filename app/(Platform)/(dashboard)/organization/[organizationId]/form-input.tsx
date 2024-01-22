'use client'

import {useFormStatus} from 'react-dom'
interface FormInputProps {
    errors?: {
        title?: string[];
    }
}

export const FormInput = ({errors}: FormInputProps) => {

    return (
        <div className='flex flex-col'>
            <input
                id='title'
                name='title'
                required
                placeholder='Please type board title'
                className='border border-sky-700 rounded-md p-1'
            />
            <div>
                {errors?.title ? (
                    errors?.title.map((error: string) => (
                        <p key={error} className='text-rose-500'>
                            {error}
                        </p>
                    ))
                ): null}
            </div>
        </div>
    )
}