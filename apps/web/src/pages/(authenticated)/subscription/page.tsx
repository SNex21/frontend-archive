import { useUser } from "@/providers/AuthProvider/AuthProvider";
import { WithSubscriptionPage } from "./WithSubscription";
import { NoSubscriptionPage } from "./NoSubscription";


export default function SubscriptionPage() {
    const user = useUser();

    return (
    <div>
      {!user.subscription ? (
            <NoSubscriptionPage/>
        ) : (
            <WithSubscriptionPage/>
        )}
    </div>
  );
}
