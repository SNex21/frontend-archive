import styles from "./Subscribe.module.scss";
import { useNavigate } from "react-router-dom";

import { useUser } from "@/providers/AuthProvider/AuthProvider";
import { useCloudStorage } from "@/lib/twa/hooks";
import { ACCESS_TOKEN_NAME } from "@/services/auth/storage.ts";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionInfo } from "@/services/api/subscriptions";
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
