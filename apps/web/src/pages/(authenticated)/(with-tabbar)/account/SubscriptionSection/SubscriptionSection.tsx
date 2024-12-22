import { FC } from "react";

import styles from "./SubscriptionSection.module.scss";
import cn from "classnames";
// import { useUser } from "@/providers/AuthProvider/AuthProvider";

const SubscriptionSection: FC = () => {
  // const user = useUser();

  return (
      <section className={cn("wrapper", styles.section)}>
        <h2 className={styles.section__heading}>Подписка</h2>
      </section>
      )
    };

export { SubscriptionSection };
