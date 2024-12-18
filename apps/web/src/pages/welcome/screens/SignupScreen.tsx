import { useInitData } from "@/lib/twa/hooks";
import { motion } from "framer-motion";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "../Welcome.module.scss";
import { Haptic } from "@/lib/twa/components/Haptic";
import { Avatar, AvatarFallback, AvatarImage, Button, LoaderSpinner } from "@repo/ui";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import { authTelegramMiniApp, checkUsername, login } from "@/services/auth";
import axios, { AxiosError, CancelTokenSource } from "axios";
import { ERROR_CODES } from "@/services/api/errors";
import debounce from "lodash/debounce";
import { CheckmarkCircleIcon, XmarkCircleIcon } from "@repo/ui/icons";
import { HuggingFaceEmoji } from "@repo/ui/emojis";
import posthog from "posthog-js";

const SignupScreen: FC = () => {
  console.log(0)
  const [initDataUnsafe, initData] = useInitData();
  const navigate = useNavigate();
  console.log(1)

  const [isFocused, setFocused] = useState(false);
  console.log(2)
  const [username, setUsername] = useState<string>(initDataUnsafe?.user?.username ?? "");
  console.log(3)
  const [status, setStatus] = useState<{
    success: boolean;
    error: null | string;
    loading: boolean;
  }>({ success: false, error: null, loading: false });
  console.log(4)
  const cancelTokenRef = useRef<CancelTokenSource | null>(null);
  console.log(5)
  const handleUsernameCheck = useCallback(
    debounce(async (name: string) => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel("New request initiated");
      }
      console.log(6)
      const newCancelToken = axios.CancelToken.source();
      cancelTokenRef.current = newCancelToken;
      console.log(7)
      try {
        setStatus((prev) => ({ ...prev, loading: true }));
        const res = await checkUsername({
          username: name,
          cancelToken: newCancelToken.token,
        });
        if (res.status === "ok") {
          setStatus({ success: true, error: null, loading: false });
        }
      } catch (e) {
        if (!axios.isCancel(e)) {
          const error = e as AxiosError;
          setStatus({
            success: false,
            error: getErrorMessage(error.response?.status),
            loading: false,
          });
        }
      }
    }, 1000),
    [],
  );
  console.log(8)
  useEffect(() => {
    if (username) {
      console.log(9)
      handleUsernameCheck(username);
    } else {
      console.log(10)
      setStatus({ success: false, error: null, loading: false });
    }

    return () => {
      if (cancelTokenRef.current) {
        cancelTokenRef.current.cancel("Component unmounting");
      }
    };
  }, [username, handleUsernameCheck]);
  console.log(11)
  const handleLogin = useCallback(async () => {
    try {
      console.log(12112121212)
      const res = await authTelegramMiniApp({
        query: "query_id=AAGVCrdBAAAAAJUKt0HlUjAz&user=%7B%22id%22%3A1102514837%2C%22first_name%22%3A%22%D0%9C%D0%BE%D1%82%D1%8C%D0%BA%D0%B0%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Matveggg%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F_G1aRk2NawI5-sKQMUNS5rzjDu_hnTbUTZW0GRlLMnE.svg%22%7D&auth_date=1734452236&signature=s3SJktK6QN6uFx_m2gFgI0-svJZHDZ7ox0k9EtkXb2RgpFLKn5vnoT3hLe9YAMsSsZNCyf0PHJ03wWAz6wm6AQ&hash=09c04b31adf2e0bc453d315f4e88dbbd664be57b758fc784efb45b1525f38076",
        username,
        avatarUrl: "",
      });
      await login({ token: res.token, userId: res.user.id });
      posthog.capture("user_signed_up");
      navigate("/home");
    } catch (e) {
      const error = e as AxiosError;
      setStatus({
        success: false,
        error: getErrorMessage(error.response?.status),
        loading: false,
      });
    }
  }, [initData, username, setStatus]);

  return (
    <motion.div
      className={styles.signup}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0 }}
    >
      <motion.div
        className={cn(styles.signup__title)}
        initial={{
          opacity: 0,
          filter: "blur(10px)",
          transform: "translateY(50px)",
        }}
        animate={{
          opacity: 1,
          filter: "blur(0)",
          transform: "translateY(0)",
        }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      >
        <h1 className={cn(styles.title)}>
          Давай создадим
          <br />
          аккаунт
        </h1>
      </motion.div>

      <div
        className={cn(styles.signup__content, {
          [styles.signup__content_expanded!]: isFocused,
        })}
      >
        <div className={styles.form}>
          <div className={styles.form__avatar}>
            <Avatar className={styles.form__avatar__image}>
              <AvatarFallback>{username.at(0)?.toUpperCase() ?? <HuggingFaceEmoji size={40} />}</AvatarFallback>
              <AvatarImage />
            </Avatar>
          </div>
          <div
            className={cn(styles.form__username, {
              [styles.form__username_success!]: status.success,
              [styles.form__username_error!]: !!status.error,
            })}
          >
            <label htmlFor="username" data-label>
              Никнейм
            </label>
            <div className={styles.form__username__input}>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  data-input
                  id="username"
                  placeholder="Место для вашего крутого ника"
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  value={username}
                  onInput={(e) => {
                    setUsername(e.currentTarget.value);
                    setStatus({ success: false, error: null, loading: true });
                  }}
                />
                <div data-indicator>
                  {status.success && <CheckmarkCircleIcon size={23} />}
                  {status.error && <XmarkCircleIcon size={23} />}
                  {status.loading && <LoaderSpinner size={23} />}
                </div>
              </div>

              {status.success && <p data-message>Классный ник! Он свободен</p>}
              {!!status.error && <p data-message>{status.error}</p>}
            </div>
          </div>
        </div>
        <div className={styles.signup__button}>
          <Haptic type="impact" value="medium" event="onTouchStart" asChild>
            <Button disabled={!status.success} onClick={status.success ? handleLogin : undefined}>
              СОЗДАТЬ АККАУНТ
            </Button>
          </Haptic>
        </div>
      </div>
    </motion.div>
  );
};

function getErrorMessage(code?: number) {
  switch (code) {
    case ERROR_CODES.INVALID_USERNAME:
      return "Это имя пользователя уже занято";
    case ERROR_CODES.USERNAME_NOT_AVAILABLE:
      return "Имя не подходит. Вы можете использовать символы a-z, 0-9 и подчеркивания. Длина от 5 до 32 символов";
    default:
      return "Произошла непредвиденная ошибка. Попробуйте перезапустить приложение или воспользуйтесь официальным клиентом Telegram";
  }
}

export { SignupScreen };
