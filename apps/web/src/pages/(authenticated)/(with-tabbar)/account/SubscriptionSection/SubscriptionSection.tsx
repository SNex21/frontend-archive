import { FC } from "react";
import { Haptic } from "@/lib/twa/components/Haptic";
import { Link } from "react-router-dom";
import styles from "./SubscriptionSection.module.scss";
import cn from "classnames";
// import { useUser } from "@/providers/AuthProvider/AuthProvider";

interface SubscriptionCardProps {
  title: string;
  description?: string;
  isSm?: boolean;
  href?: string;
}

const SubscriptionSection: FC = () => {
  // const user = useUser();
  return (
      <section className={cn("wrapper", styles.section)}>
        <h2 className={styles.section__heading}>Подписка</h2>
        <SubscriptionCard
          title="Тут короче про твою подписку бла бла бла"
          description="купи по братски"
          href={"/"}
        />
      </section>
      )
    };

const SubscriptionCard: FC<SubscriptionCardProps> = ({ title, description, isSm = false, href = "" }) => {
  return (
    <Haptic type="impact" value="medium" asChild>
      <Link to={href} className={styles.card}>
        <div className={styles.card__content}>
          <h3
            className={cn(styles.card__content__title, {
              [styles.card__content__title_sm!]: isSm,
            })}
          >
            {title}
          </h3>
          {description && <p className={styles.card__content__description}>{description}</p>}
        </div>
      </Link>
    </Haptic>
  );
};
    

export { SubscriptionSection };
