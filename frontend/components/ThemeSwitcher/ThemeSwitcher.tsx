"use client";
import styles from "./ThemeSwitcher.module.scss";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.switcher}
      aria-label="Перемкнути тему"
      onClick={toggleTheme}
      data-theme={theme}
    >
      <span className={styles.track}>
        <span className={styles.thumb} />
      </span>
    </button>
  );
}
