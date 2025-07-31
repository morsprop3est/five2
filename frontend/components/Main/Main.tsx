'use client';

import styles from "./Main.module.scss";
import CarPhoto from "./CarPhoto";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoogleAuthButton from "../GoogleAuthButton/GoogleAuthButton";

gsap.registerPlugin(ScrollTrigger);

export default function Main() {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>
        Find your own{" "}
        <span className={styles.vehicleWrapper}>
          <svg
            width="320"
            height="70"
            viewBox="0 0 320 80"
            className={styles.vehicleSvg}
          >
            <defs>
              <mask id="text-mask">
                <rect width="100%" height="100%" fill="white" />
                <text
                  x="50%"
                  y="55%"
                  textAnchor="middle"
                  fontSize="64"
                  fontWeight="bold"
                  fontFamily="inherit"
                  dy=".35em"
                  fill="black"
                >
                  VEHICLE
                </text>
              </mask>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="#FF8311" 
              mask="url(#text-mask)"
              rx="16"
            />
          </svg>
        </span>
      </h1>
      <p className={styles.text}>Наш сервіс надає вам можливість зручного пошуку автомобілів на різних європейських веб-сайтах продажу автомобілів. Ми спростимо процес пошуку доступних автомобілів, щоб ви могли знайти те, що вам потрібно.</p>
      <div className={styles.authButtons}>
        <GoogleAuthButton className={styles.googleBtn}>
          Увійти через Google
        </GoogleAuthButton>
      </div>
      <div className={styles.photoWrapper}>
        <CarPhoto />
      </div>
    </div>
  );
} 