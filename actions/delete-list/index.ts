"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import { DeleteList} from "./schema";
import { InputType, ReturnType } from "./types";
import {list} from "postcss";
import {createAuditLog} from "@/lib/create-audit-log";
import {ACTIONS, ENTITY_TYPE} from ".prisma/client";


const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized",
        };
    }


    const { id, boardId } = data;
    let list;

    try {

        list = await db.list.delete({
            where: {
                id,
                boardId,
                board: {
                    orgId
                }
            },
        });

        await createAuditLog({
            entityTitle: list.title,
            entityId: list.id,
            entityType: ENTITY_TYPE.LIST,
            actions: ACTIONS.DELETE
        });
    } catch (error) {
        return {
            error: "Failed to delete."
        }
    }

    revalidatePath(`/board/${boardId}`);
    return {data: list}
};

export const deleteList = createSafeAction(DeleteList, handler);