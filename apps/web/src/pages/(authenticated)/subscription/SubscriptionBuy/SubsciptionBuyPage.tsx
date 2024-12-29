import { Button } from "@repo/ui";
import { useParams } from "react-router-dom";
import { useCloudStorage } from "@/lib/twa/hooks";
import { useQuery } from "@tanstack/react-query";
import { getPaymentUrl } from "@/services/api/subscriptions";
import { ACCESS_TOKEN_NAME } from "@/services/auth/storage.ts";
import styles from "./SubscriptionBuy.module.scss";


export default function SubscriptionBuyPage() {
    const params = useParams();
    const cloudStorage = useCloudStorage();

    const { data: payment_url, isLoading } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () =>
            getPaymentUrl({
            token: await cloudStorage.getItem(ACCESS_TOKEN_NAME),
            plan_id: Number(params.planId),
            email: "www@gmail.com", // починить
          }),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        gcTime: 0,
      });

      if (isLoading || !payment_url) {
        return <SubscriptionBuyLoading />;
      }
    
    return (
        <>
            <div className={styles.complete__buttons}>
            <Button asChild>
                <a href={payment_url.url} target="_blank" rel="noopener noreferrer">Купить!</a>
            </Button>
            </div>
        </>
        );
    }

const SubscriptionBuyLoading = () => {
return (
    <div></div>
);
};
