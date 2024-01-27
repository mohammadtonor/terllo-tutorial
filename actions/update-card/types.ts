import {z} from "zod";
import {UpdateCard} from "@/actions/update-card/schema";
import {ActionState} from "@/lib/create-safe-action";
import {Board} from ".prisma/client";
import {Card} from "@prisma/client";

export type InputType = z.infer<typeof UpdateCard>;
export type ReturnType = ActionState<InputType, Card>