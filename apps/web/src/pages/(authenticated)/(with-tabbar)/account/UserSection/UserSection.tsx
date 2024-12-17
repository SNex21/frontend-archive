import { FC } from "react";
import dayjs from "dayjs";

import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";

import styles from "./UserSection.module.scss";
import { useUser } from "@/providers/AuthProvider/AuthProvider";

const UserSection: FC = () => {
  const user = useUser();

  return (
    <section className={styles.user}>
      <div className={styles.avatar}>
        <Avatar className={styles.avatar__content}>
          <AvatarImage src={user.avatarUrl} />
          <AvatarFallback>{user.username.at(0)?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
      <div className={styles.info}>
        <h2 className={styles.info__heading}>{user.username}</h2>
        <p className={styles.info__desc}>
          Регистрация: {dayjs(user.create_datetime, "DD.MM.YYYY hh:mm:ss").format("MMMM YYYY")}
        </p>
      </div>
    </section>
  );
};

export { UserSection };
