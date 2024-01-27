'use server'

import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeAction} from "@/lib/create-safe-action";
import {InputType, ReturnType} from "@/actions/update-card/types";
import {UpdateCard} from "@/actions/update-card/schema";
import {createAuditLog} from "@/lib/create-audit-log";
import {ACTIONS, ENTITY_TYPE} from ".prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId} = auth();

    if ( !userId || !orgId ) {
        return {
            error: 'Unauthorized'
        }
    }

    const { id, boardId, ...values } = data;
    let card;

    try {
        console.log(boardId);
        card = await db.card.update({
            where: {
                id,
                list: {
                    board: {
                        orgId
                    }
                }
            },
            data: {
                ...values
            }
        })

        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            actions: ACTIONS.UPDATE
        });
    } catch (error) {
        return  {
            error: 'Error updating!'
        }
    }

    revalidatePath(`/board/${boardId}`);
    return {
        data: card
    }
}

export const updateCard = createSafeAction(UpdateCard, handler);