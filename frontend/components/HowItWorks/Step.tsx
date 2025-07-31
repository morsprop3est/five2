"use client";

import { forwardRef } from "react";
import styles from "./Step.module.scss";
import { HowItWorksStep } from "../../app/data/howItWorks";

interface StepProps {
  step: HowItWorksStep;
  isActive: boolean;
  isLeft: boolean;
  isVisible: boolean;
  isEntering: boolean;
  isLeaving: boolean;
}

const Step = forwardRef<HTMLDivElement, StepProps>(
  ({ step, isActive, isLeft, isVisible, isEntering, isLeaving }, ref) => {
    return (
      <div
        ref={ref}
        className={`${styles.step} ${isActive ? styles.active : ""} ${
          isLeft ? styles.left : styles.right
        } ${isVisible ? styles.visible : ""} ${
          isEntering ? styles.entering : ""
        } ${isLeaving ? styles.leaving : ""}`}
      >
        <div className={styles.stepContent}>
          <h3>{step.title}</h3>
          <p>{step.description}</p>
        </div>
        <div className={styles.stepImage}>
          <img src={step.imageUrl} alt={step.title} />
        </div>
      </div>
    );
  }
);

Step.displayName = "Step";

export default Step; 