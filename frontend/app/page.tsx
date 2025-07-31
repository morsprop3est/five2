"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import styles from "./page.module.scss";
import Navigation from "../components/Navigation/Navigation";
import Main from "../components/Main/Main";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import Websites from "../components/Websites/Websites";
import ContactUs from "../components/ContactUs/ContactUs";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "18px",
        color: "var(--text-secondary)"
      }}>
        Завантаження...
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.page}>
      <Navigation />
      <Main />
      <HowItWorks />
      <Websites />
      <ContactUs />
    </div>
  );
}
