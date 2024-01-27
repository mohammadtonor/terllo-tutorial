'use client'

import {useCardModal} from "@/hooks/use-card-modal";
import {useQuery} from "@tanstack/react-query";
import {CardWithList} from "@/types";
import {fetcher} from "@/lib/fetcher";

import {Dialog, DialogContent} from "@/components/ui/dialog";
import {Header} from "@/components/modals/card-modal/header";
import {Description} from "@/components/modals/card-modal/description";
import {Actions} from "@/components/modals/card-modal/actions";
import {AuditLog} from ".prisma/client";
import {Activity} from "@/components/modals/card-modal/activity";

export const Index = () => {
    const {id, isOpen, onClose } = useCardModal()

    console.log(id);

    const {data: cardData } = useQuery<CardWithList>({
        queryKey: ['card', id],
        queryFn: () => fetcher(`/api/cards/${id}`)
    });

    const {data: auditLogData } = useQuery<AuditLog[]>({
        queryKey: ['card-logs', id],
        queryFn: () => fetcher(`/api/cards/${id}/logs`)
    })

    console.log(auditLogData);

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onClose}
        >
            <DialogContent>
                {!cardData
                    ? <Header.Skeleton />
                    : <Header data={cardData}/>
                }
                <div className='grid grid-cols-1 md:grid-cols-4 md: gap-4'>
                    <div className='col-span-3'>
                        <div className='w-full space-y-6'>
                            {!cardData
                                ? <Description.Skeleton />
                                : <Description data={cardData} />
                            }
                            {!auditLogData
                                ? <Activity.Skeleton />
                                : <Activity items={auditLogData} />
                            }
                        </div>
                    </div>
                    {!cardData
                        ? <Actions.Skeleton />
                        : <Actions data={cardData}/>
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}