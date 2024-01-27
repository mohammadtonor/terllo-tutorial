'use server'

import {InputType, ReturnType} from "@/actions/update-board/types";
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeAction} from "@/lib/create-safe-action";
import {UpdateBoard} from "@/actions/update-board/schema";
import {createAuditLog} from "@/lib/create-audit-log";
import {ACTIONS, ENTITY_TYPE} from ".prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId} = auth();

    if ( !userId || !orgId ) {
        return {
            error: 'Unauthorized'
        }
    }

    const { title, id } = data;
    let board;

    try {
        board = await db.board.update({
            where: {
                id,
                orgId
            },
            data: {
                title
            }
        })

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            actions: ACTIONS.UPDATE
        });
    } catch (error) {
        return  {
            error: 'Error updating board'
        }
    }

    revalidatePath(`/board/${id}`);
    return {
        data: board
    }
}

export const updateBoard = createSafeAction(UpdateBoard, handler);