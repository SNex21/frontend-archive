import { FC } from "react";
import { StatsCard } from "./StatsCard";
import {
  CheckMarkButtonEmoji,
  FireEmoji,
  ThumbsUpEmoji,
} from "@repo/ui/emojis";

import styles from "./StatsSection.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getUserStats } from "@/services/api/users";
import { useCloudStorage } from "@/lib/twa/hooks";
import { ACCESS_TOKEN_NAME } from "@/services/auth/storage.ts";

import { Skeleton } from "@repo/ui";
import { useUser } from "@/providers/AuthProvider/AuthProvider.tsx";

const StatsSection: FC = () => {
  const user = useUser();
  const cloudStorage = useCloudStorage();
  const { data: stats, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () =>
      getUserStats({
        id: user.id,
        token: await cloudStorage.getItem(ACCESS_TOKEN_NAME),
      }),
  });

  if (isLoading || !stats) {
    return <StatsSectionLoading />;
  }

  return (
    <section className="wrapper">
      <div className={styles.cards}>
        <StatsCard
          value={stats.streak}
          label={"Ударный режим"}
          icon={<FireEmoji size={25} />}
        />
        <StatsCard
          value={stats.total_tasks}
          label={"Всего решено"}
          icon={<CheckMarkButtonEmoji size={22} />}
        />
        <StatsCard
          value={`${stats.accuracy}%`}
          label={"Решено верно"}
          icon={<ThumbsUpEmoji size={25} />}
          style={{ gridColumn: "span 2" }}
        />
      </div>
    </section>
  );
};

const StatsSectionLoading = () => {
  return (
    <section className="wrapper">
      <div className={styles.cards}>
        <Skeleton
          style={{ height: "65px", borderRadius: "var(--rounded-2xl)" }}
        />
        <Skeleton
          style={{ height: "65px", borderRadius: "var(--rounded-2xl)" }}
        />
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

export { StatsSection };
