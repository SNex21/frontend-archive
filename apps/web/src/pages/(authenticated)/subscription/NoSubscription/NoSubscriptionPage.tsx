import { FC } from "react";
import { Haptic } from "@/lib/twa/components/Haptic";
import { Link } from "react-router-dom";
import styles from "./NoSubscribe.module.scss";
import cn from "classnames";
import { BackButton } from "@/lib/twa/components/BackButton";
import { useNavigate } from "react-router-dom";

import { useCloudStorage } from "@/lib/twa/hooks";
import { ACCESS_TOKEN_NAME } from "@/services/auth/storage.ts";
import { useQuery } from "@tanstack/react-query";
import { getSubscriptionInfo, getSubscriptionPlans } from "@/services/api/subscriptions";
import { Skeleton } from "@repo/ui";

interface NoSubscriptionCardProps {
    title: string;
    description?: string;
    isSm?: boolean;
    href?: string;
}

interface PlanSubscriptionCardProps {
  title: string;
  description?: string;
  price: number;
  isSm?: boolean;
  href?: string;
}

export const NoSubscriptionPage: FC = () => {
  const navigate = useNavigate();
  const cloudStorage = useCloudStorage();

  const { data: subscription, isLoading: isLoadingSubInfo } = useQuery({
    queryKey: ["subscription"],
    queryFn: async () =>
      getSubscriptionInfo({
        token: await cloudStorage.getItem(ACCESS_TOKEN_NAME),
      }),
  });

  const { data, isLoading: isLoadingPlans } = useQuery({
    queryKey: ["plans"],
    queryFn: async () =>
      getSubscriptionPlans({
        token: await cloudStorage.getItem(ACCESS_TOKEN_NAME),
      }),
  });

  if (isLoadingSubInfo || isLoadingPlans || !subscription || !data) {
    return <SubscriptionSectionLoading />;
  }


  return (
    <div>
        <BackButton onClick={() => navigate("/account")} />
        <section className={cn("wrapper", styles.section)}>
        <h2 className={styles.section__heading}>Подписка</h2>
        <NoSubscriptionCard
        title="У тебя пока нет подписки"
        description="Открывай доступ ко всем заданиям с подпиской!"
        href={"/"}
        />
        <h2 className={styles.section__subheading}>Выбери свою подписку!</h2>
        {data.map((plan) => (
          <PlanSubscriptionCard
          title={plan.title}
          description={plan.description}
          price={plan.price}
          href={"/"}
          />
        ))}

        </section>
    </div>
    )
  };

const NoSubscriptionCard: FC<NoSubscriptionCardProps> = ({ title, description, isSm = false, href = "" }) => {
    return (
        <div>
            <Haptic type="impact" value="medium" asChild>
            <Link to={href} className={styles.info_card}>
                <div className={styles.info_card__content}>
                <h3
                    className={cn(styles.info_card__content__title, {
                    [styles.info_card__content__title_sm!]: isSm,
                    })}>
                    {title}
                </h3>
                {description && <p className={styles.info_card__content__description}>{description}</p>}
                </div>
                {
            
                }
            </Link>
            </Haptic>
        </div>
    );
    };

const PlanSubscriptionCard: FC<PlanSubscriptionCardProps> = ({ title, description, price, isSm = false, href = "" }) => {
  return (
      <div>
          <Haptic type="impact" value="medium" asChild>
          <Link to={href} className={styles.subscription_card}>
              <div className={styles.subscription_card__content}>
              <h3
                  className={cn(styles.subscription_card__content__title, {
                  [styles.subscription_card__content__title_sm!]: isSm,
                  })}>
                  {title}
              </h3>
              {description && <p className={styles.subscription_card__content__description}>{description}</p>}
              {price && <p className={styles.subscription_card__content__description}>{price} руб.</p>}
              </div>
              {
          
              }
          </Link>
          </Haptic>
      </div>
  );
  };



const SubscriptionSectionLoading = () => {
    return (
      <section className="wrapper">
        <div className={styles.cards}>
          <Skeleton
            style={{
              height: "65px",
              borderRadius: "var(--rounded-2xl)",
              gridColumn: "span 2",
            }}
          />
        </div>
      </section>
    );
  };
