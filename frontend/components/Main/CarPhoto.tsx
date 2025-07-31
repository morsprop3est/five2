"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./CarPhoto.module.scss";

export default function CarPhoto() {
    const leftWheelRef = useRef<HTMLDivElement>(null);
    const rightWheelRef = useRef<HTMLDivElement>(null);
    const [entryDone, setEntryDone] = useState(false);
  
    useEffect(() => {
      gsap.set("#carImage", { x: 1200, opacity: 1 });
      gsap.set("#leftWheel", { x: 1200, opacity: 1 });
      gsap.set("#rightWheel", { x: 1200, opacity: 1 });
  
      const entry = gsap.timeline({
        onComplete: () => setEntryDone(true)
      });
      entry
        .to(["#carImage", "#leftWheel", "#rightWheel"], {
          x: 0,
          opacity: 1,
          duration: 2,
          ease: "power3.out",
        })
        .to(
          ["#leftWheel img", "#rightWheel img"],
          {
            rotation: -1000,
            duration: 2,
            ease: "power2.out",
          },
          "<"
        );
    }, []);

  return (
    <div className={styles.carPhoto} id="carPhoto">
      <div ref={leftWheelRef} className={`${styles.wheel} ${styles.leftWheel}`} id="leftWheel">
        <Image src="/images/main/wheel.png" alt="wheel" width={80} height={80} priority />
      </div>
      <Image
        src="/images/main/porsche-main-image.png"
        alt="car"
        width={600}
        height={300}
        className={styles.carImg}
        id="carImage"
        priority
      />
      <div ref={rightWheelRef} className={`${styles.wheel} ${styles.rightWheel}`} id="rightWheel">
        <Image src="/images/main/wheel.png" alt="wheel" width={80} height={80} priority />
      </div>
    </div>
  );
} 