import { TheorySection } from "./TheorySection";
import pageStyles from "../Page.module.scss";
import styles from "./Theory.module.scss";


export default function TheoryPage() {
  return (
    <div className={pageStyles.main}>
      <div className={styles.overlayLine}></div>
      <div className={styles.overlayLine}></div>
      <TheorySection />
    </div>
  );
}