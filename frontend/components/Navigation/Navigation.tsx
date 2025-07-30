"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import styles from "./Navigation.module.scss";

const Navigation: React.FC = () => {
  const { user, login, logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async () => {
    await login();
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <h1>Five2</h1>
          </Link>
        </div>
        
        <div className={styles.actions}>
          <button 
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label={`Перемкнути на ${theme === 'light' ? 'темну' : 'світлу'} тему`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          
          {isAuthenticated ? (
            <div className={styles.userSection}>
              <Link href="/dashboard" className={styles.navLink}>
                Дашборд
              </Link>
              <Link href="/profile" className={styles.navLink}>
                Профіль
              </Link>
              <span className={styles.userName}>
                {user?.name || user?.email}
              </span>
              <button 
                className={styles.logoutButton}
                onClick={handleLogout}
              >
                Вийти
              </button>
            </div>
          ) : (
            <button 
              className={styles.loginButton}
              onClick={handleLogin}
            >
              <img 
                src="/icons/common/google.svg" 
                alt="Google" 
                className={styles.googleIcon}
              />
              Увійти через Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 