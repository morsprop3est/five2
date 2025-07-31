"use client";

import { ReactNode, useRef, useEffect } from "react";
import { gsap } from "gsap";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  waveEffect?: boolean;
}

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  onClick,
  className = "",
  fullWidth = false,
  waveEffect = false
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!waveEffect) return;
    
    const button = buttonRef.current;
    const wave = waveRef.current;
    
    if (!button || !wave) return;

    let isAnimating = false;
    let currentAnimation: gsap.core.Tween | null = null;

    const handleMouseEnter = (e: MouseEvent) => {
      if (disabled) return;
      
      const rect = button.getBoundingClientRect();
      
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const distanceFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      
      const maxDistance = Math.sqrt(
        Math.pow(rect.width / 2, 2) + Math.pow(rect.height / 2, 2)
      );
      
      const waveRadius = maxDistance * 3;
      
      if (currentAnimation) {
        currentAnimation.kill();
      }
      
      gsap.set(wave, {
        x: x - 50,
        y: y + 25,
        scale: 0,
        opacity: 1
      });
      
      isAnimating = true;
      
      currentAnimation = gsap.to(wave, {
        scale: waveRadius / 50,
        duration: 3,
        ease: "power2.out",
        onComplete: () => {
          isAnimating = false;
          currentAnimation = null;
        }
      });
    };

    const handleMouseLeave = () => {
      if (currentAnimation) {
        currentAnimation.kill();
        currentAnimation = null;
      }
      
      isAnimating = false;
      
      gsap.to(wave, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      
      if (currentAnimation) {
        currentAnimation.kill();
      }
    };
  }, [disabled, waveEffect]);

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${
        fullWidth ? styles.fullWidth : ""
      } ${waveEffect ? styles.waveButton : ""} ${className}`}
    >
      {waveEffect && <div ref={waveRef} className={styles.wave} />}
      <span className={waveEffect ? styles.content : ""}>{children}</span>
    </button>
  );
} 