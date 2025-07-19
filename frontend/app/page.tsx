import styles from "./page.module.scss";
import ThemeSwitcher from "../components/ThemeSwitcher/ThemeSwitcher";
import Main from "../components/Main/Main";
import HowItWorks from "../components/HowItWorks/HowItWorks";

export default function Home() {
  return (
    <div className={styles.page}>
      <ThemeSwitcher />
      <Main />
      <HowItWorks />
    </div>
  );
}
