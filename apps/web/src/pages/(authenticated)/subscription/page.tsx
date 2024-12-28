import { useUser } from "@/providers/AuthProvider/AuthProvider";
import { WithSubscriptionPage } from "./WithSubscription";
import { NoSubscriptionPage } from "./NoSubscription";


export default function SubscriptionPage() {
    const user = useUser();

    // if (isLoading || !subscription) {
    //     return <SubscriptionSectionLoading />;
    // }

    return (
    <div>
      {!user.subscription ? (
            <WithSubscriptionPage/>
        ) : (
            <NoSubscriptionPage/>
        )}
    </div>
  );
}
