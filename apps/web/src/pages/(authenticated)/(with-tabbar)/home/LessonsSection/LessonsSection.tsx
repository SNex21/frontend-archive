import { FC } from "react";
import styles from "./LessonSection.module.scss";
import { Haptic } from "@/lib/twa/components/Haptic";
import cn from "classnames";
import { useQuery } from "@tanstack/react-query";
import { useCloudStorage } from "@/lib/twa/hooks";
import { ACCESS_TOKEN_NAME } from "@/services/auth/storage.ts";
import { Topic } from "@/models/Topic.ts";
import { Skeleton } from "@repo/ui";
import { getTasksTopics } from "@/services/api/tasks";
import { Link } from "react-router-dom";
import { useUser } from "@/providers/AuthProvider/AuthProvider";
import Vector from "../../../../../assets/fonts/images/Vector.png";


const LessonsSection: FC = () => {
  return (
    <section className={cn("wrapper", styles.section)}>
      <h2 className={styles.section__heading}>По заданиям</h2>
      <LessonCards />
    </section>
  );
};

const LessonCards: FC = () => {
  const cloudStorage = useCloudStorage();
  const { data, isLoading } = useQuery({
    queryKey: ["topics"],
    queryFn: async () =>
      getTasksTopics({
        token: await cloudStorage.getItem(ACCESS_TOKEN_NAME),
      }),
  });

  if (isLoading || !data) {
    return (
      <div className={styles.cards}>
        {[...Array(6).keys()].map((i) => (
          <Skeleton key={i} style={{ height: "157px", borderRadius: "var(--rounded-2xl)" }} />
        ))}
      </div>
    );
  }

  const user = useUser();

  if (!user.subscription) {
    return (
      <div className={styles.cards}>
        {data.map((topic) => (
          <LessonCardBlocked key={topic.slug} {...topic} />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.cards}>
      {data.map((topic) => (
        <LessonCard key={topic.slug} {...topic} />
      ))}
    </div>
  );
};

const LessonCard: FC<Topic> = ({id, title, ege_number }) => {
  return (
    <Haptic type="impact" value="medium" asChild>
      <Link to={`/lesson/topic/${id}`}>
        <div className={styles.card}>
          <div className={styles.card__content}>
            {ege_number && <span className={styles.card__content__number}>№{ege_number}</span>}
            <h3 className={styles.card__content__title}>{title}</h3>
          </div>
        </div>
      </Link>
    </Haptic>
  );
};

const LessonCardBlocked: FC<Topic> = ({title, ege_number }) => {
  return (
    <Haptic type="impact" value="medium" asChild>
      <Link to={`/`}>
        <div className={styles.blocked_card}>
          <div className={styles.blocked_card__content}>
            {ege_number && <span className={styles.blocked_card__content__number}>№{ege_number}</span>}
            <div
              className={styles.container}
            >
            <img
              src={Vector}
              alt="Логотип"
              className={styles.logo} />
              </div>
            <h3 className={styles.blocked_card__content__title}>{title}</h3>
          </div>
        </div>
      </Link>
    </Haptic>
  );
};

export { LessonsSection };
