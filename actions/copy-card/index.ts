"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";

import {CopyCard} from "./schema";
import { InputType, ReturnType } from "./types";
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
    let card;

    try {
        const cardCopy= await db.card.findUnique({
            where: {
                id,
                list: {
                    board: {
                        orgId
                    }
                }
            }
        });

        if (!cardCopy) {
            return { error: "Card not found"}
        }

        const lastCard = await db.card.findFirst({
            where: {listId: cardCopy.listId},
            orderBy: {order: 'desc'},
            select: { order: true }
        })

        const newOrder = lastCard ? lastCard.order + 1 : 1;

        card = await db.card.create({
            data: {
                title: `${cardCopy.title} - Copy`,
                description: cardCopy.description,
                order: newOrder,
                listId: cardCopy.listId
            }
        });

        await createAuditLog({
            entityTitle: card.title,
            entityId: card.id,
            entityType: ENTITY_TYPE.CARD,
            actions: ACTIONS.CREATE
        });
    } catch (error) {
        return {
            error: "Failed to copy."
        }
    }

    revalidatePath(`/board/${boardId}`);
    return { data: card }
};

export const copyCard = createSafeAction(CopyCard, handler);