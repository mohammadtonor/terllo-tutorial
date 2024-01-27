import {Suspense} from "react";
import {Info} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/_components/info";
import {Separator} from "@/components/ui/separator";
import {
    ActivityList
} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/activity/_components/activity-list";

const ActivityPage = () => {
    return (
        <div className='w-full'>
            <Info />
            <Separator className='my-2'/>
            <Suspense fallback={<ActivityList.Skeleton />}/>
            <ActivityList />
        </div>
    );
};

export default ActivityPage;
