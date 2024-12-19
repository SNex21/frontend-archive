import { TheorySection } from "./TheorySection";
import pageStyles from "../Page.module.scss";
import styles from "./Theory.module.scss";


export default function TheoryPage() {
  return (
    <><div
      className={styles.container}
      style={{ backgroundImage: '/public/Gradient.png' }}
    >
      <img
        src="frontend-archive/apps/web/public/Vector.png" 
        alt="Логотип"
        className={styles.logo} />
      <p className={styles.text}>
        Раздел <span className={styles.highlight}>Теория</span> находится в активной
        разработке команды Учибота. Следи за обновлениями в Telegram канале.
      </p>
      <a href="https://t.me/ege_uchibot" target="_blank" rel="noopener noreferrer">
        <button className={styles.button}>Перейти в канал</button>
      </a>
    </div><div className={pageStyles.main}>
        <TheorySection />
      </div></>
  );
}