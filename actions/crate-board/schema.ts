import {z} from "zod";

export const CreateBoard = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: 'Title is required'
    }).min(3 , {
        message: 'Title should be a least 3 character'
    })
})