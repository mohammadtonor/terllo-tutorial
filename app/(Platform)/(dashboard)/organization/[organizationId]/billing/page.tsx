import {checkSubscription} from "@/lib/checkSubscription";
import {Info} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/_components/info";
import {Separator} from "@/components/ui/separator";
import {
    SubscriptionButton
} from "./_components/subscriptionButton";


interface SubscriptionButtonProps {

}

const BillingPAge = async () => {
    const isPro = await checkSubscription();

    return (
        <div className='w-full'>
            <Info isPro={isPro}/>
            <Separator className='my-2' />
            <SubscriptionButton isPro={isPro}/>
        </div>
    );
};

export default BillingPAge;
