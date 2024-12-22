import { StatsSection } from "./StatsSection";
import { UserSection } from "./UserSection";
import { SubscriptionSection } from "./SubscriptionSection";
import pageStyles from "../Page.module.scss";
import styles from "./Account.module.scss";
import { version } from "../../../../../package.json";

export default function AccountPage() {
  return (
    <>
      <div className={pageStyles.main}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <UserSection />
          <StatsSection />
          <SubscriptionSection />
        </div>
      </div>
      <div className={styles.info}>
        <p>Учи-бот © {new Date().getFullYear()}</p>
        <p>Версия {version}</p>
      </div>
    </>
  );
}
