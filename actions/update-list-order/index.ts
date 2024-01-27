'use server'

import {InputType, ReturnType} from "@/actions/update-list-order/types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeAction} from "@/lib/create-safe-action";
import {UpdateListOrder} from "@/actions/update-list-order/schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId} = auth();

    if ( !userId || !orgId ) {
        return {
            error: 'Unauthorized'
        }
    }

    const { items, boardId  } = data;
    let lists;

    try {
        const transaction = items.map(item =>
            db.list.update({
                where: {
                    id: item.id,
                    board: {
                        orgId
                    }
                },
                data:{
                    order: item.order,
                },
                include:{
                    cards: true
                }
            })
        );

        lists = await db.$transaction(transaction);
    } catch (error) {
        return  {
            error: 'Error reordering list!'
        }
    }

    revalidatePath(`/board/${boardId}`);
    return {
        data: lists
    }
}

export const updateListOrder = createSafeAction(UpdateListOrder ,  handler);