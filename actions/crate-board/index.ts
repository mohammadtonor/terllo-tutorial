'use server';

import {InputType, ReturnType} from './types';
import {auth} from "@clerk/nextjs";
import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";
import {createSafeAction} from "@/lib/create-safe-action";
import {CreateBoard} from "@/actions/crate-board/schema";
import {createAuditLog} from "@/lib/create-audit-log";
import {ACTIONS, ENTITY_TYPE} from ".prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
    const {userId, orgId} = auth();

    if (!userId || !orgId) {
        return {
            error: "unauthorized",
        }
    }

    const { title,image} = data;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
    ] = image.split('|')

    console.log({
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML
    })

    if(!imageId || !imageThumbUrl || !imageFullUrl || !imageUserName || !imageLinkHTML) {
        return  {
            error: 'Missing field. Failed to create board.'
        }
    }

    let board;

    try{
        board = await db.board.create({
            data: {
                title,
                orgId,
                imageId,
                imageThumbUrl,
                imageFullUrl,
                imageUserName,
                imageLinkHTML
            }
        })

        await createAuditLog({
            entityTitle: board.title,
            entityId: board.id,
            entityType: ENTITY_TYPE.BOARD,
            actions: ACTIONS.CREATE
        });
    }catch (error) {
        return {
            error: "Fields to create."
        }
    }

    revalidatePath(`/board/${board.id}`);
    return {data: board}
}

export const createBoard = createSafeAction(CreateBoard, handler)