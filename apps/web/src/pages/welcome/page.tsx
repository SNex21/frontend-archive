import React, { useEffect } from "react";
import { CoverScreen } from "./screens/CoverScreen";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Welcome.module.scss";
import { SignupScreen } from "./screens/SignupScreen";
import { useCloudStorage } from "@/lib/twa/hooks";
import { ACCESS_TOKEN_NAME } from "@/services/auth/storage.ts";
import { useNavigate } from "react-router-dom";
import { authTelegramMiniApp, login } from "@/services/auth";
import { LoaderSpinner } from "@repo/ui";
import posthog from "posthog-js";

export default function WelcomePage() {

  // const webApp = useWebApp();
  const cloudStorage = useCloudStorage();

  const navigate = useNavigate();
  const [screen, setScreen] = React.useState(0);

  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    cloudStorage.getItem(ACCESS_TOKEN_NAME).then((token)=> {
      if (token.length > 1){
        navigate("/home")
      }
    }).finally(() => setChecked(true))
  
}, []);

  useEffect(() => {
    async function handleLogin() {
      try {
         // TODO
        // const res = await authTelegramMiniApp({ query: webApp.initData });
        const res = await authTelegramMiniApp({ query: "query_id=AAGVCrdBAAAAAJUKt0HlUjAz&user=%7B%22id%22%3A1102514837%2C%22first_name%22%3A%22%D0%9C%D0%BE%D1%82%D1%8C%D0%BA%D0%B0%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Matveggg%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F_G1aRk2NawI5-sKQMUNS5rzjDu_hnTbUTZW0GRlLMnE.svg%22%7D&auth_date=1734452236&signature=s3SJktK6QN6uFx_m2gFgI0-svJZHDZ7ox0k9EtkXb2RgpFLKn5vnoT3hLe9YAMsSsZNCyf0PHJ03wWAz6wm6AQ&hash=09c04b31adf2e0bc453d315f4e88dbbd664be57b758fc784efb45b1525f38076"})
        await login({
          token: res.token,
          userId: res.user.id,
        });
        posthog.capture("user_logged_in");
        setLoading(false);
        navigate("/home");
      } catch (e) {
        setLoading(false);
      }
    }
    handleLogin()
    if (checked) {
      handleLogin();
    }
  }, [checked]);

  if (loading) {
    return (
      <div
        style={{
          width: "100dvw",
          height: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoaderSpinner size={25} />
      </div>
    );
  }

  return (
    <motion.div
      className={styles.welcome}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{
        opacity: 1,
        filter: "blur(0)",
        transition: {
          delay: 0.2,
          duration: 1.6,
        },
      }}
    >
      <AnimatePresence>{screen === 0 && <CoverScreen onButtonClick={() => setScreen(1)} />}</AnimatePresence>
      <AnimatePresence>{screen === 1 && <SignupScreen />}</AnimatePresence>
    </motion.div>
  );
}
