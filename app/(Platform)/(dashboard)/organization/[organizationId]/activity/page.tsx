import {Suspense} from "react";
import {Info} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/_components/info";
import {Separator} from "@/components/ui/separator";
import {
    ActivityList
} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/activity/_components/activity-list";
import {checkSubscription} from "@/lib/checkSubscription";

const ActivityPage = async () => {
    const isPro = await checkSubscription();

    return (
        <div className='w-full'>
            <Info isPro={isPro}/>
            <Separator className='my-2'/>
            <Suspense fallback={<ActivityList.Skeleton />}/>
            <ActivityList />
        </div>
    );
};

export default ActivityPage;
