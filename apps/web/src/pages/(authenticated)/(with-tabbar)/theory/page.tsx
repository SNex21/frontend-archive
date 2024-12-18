import { TheorySection } from "./TheorySection";
import pageStyles from "../Page.module.scss";

export default function TheoryPage() {
  return (
    <div className={pageStyles.main}>
      <TheorySection />
    </div>
  );
}