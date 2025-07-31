"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import styles from "./HowItWorks.module.scss";
import { howItWorksSteps } from "../../app/data/howItWorks";
import Step from "./Step";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [visibleSteps, setVisibleSteps] = useState<Set<number>>(new Set([1, 2, 3, 4, 5]));
  const [enteringSteps, setEnteringSteps] = useState<Set<number>>(new Set());
  const [leavingSteps, setLeavingSteps] = useState<Set<number>>(new Set());
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollTrigger, ScrollToPlugin);

    const section = sectionRef.current;
    const header = headerRef.current;
    const steps = stepsRef.current;

    if (!section || !header || !steps) return;

    const headerPin = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      pin: header,
      pinSpacing: false,
    });

    stepRefs.current.forEach((stepRef, index) => {
      if (!stepRef) return;

      const step = index + 1;
      const stepHeight = section.offsetHeight / howItWorksSteps.length;

      ScrollTrigger.create({
        trigger: section,
        start: `top+=${stepHeight * index} top`,
        end: `top+=${stepHeight * (index + 1)} top`,
        onEnter: () => {
          setActiveStep(step);
        },
        onEnterBack: () => {
          setActiveStep(step);
        },
        onLeave: () => {
        },
        onLeaveBack: () => {
        }
      });
    });

    return () => {
      headerPin.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleDotClick = (stepId: number) => {
    setActiveStep(stepId);
    
    const stepIndex = stepId - 1;
    const stepHeight = (sectionRef.current?.offsetHeight || 0) / howItWorksSteps.length;
    const scrollTo = (sectionRef.current?.offsetTop || 0) + (stepHeight * stepIndex);
    
    gsap.to(window, {
      scrollTo: { y: scrollTo },
      duration: 1,
      ease: "power2.inOut"
    });
  };

  const progressWidth = (activeStep / howItWorksSteps.length) * 100;

  return (
    <section ref={sectionRef} className={styles.howItWorks}>
      <div className="container">
        <div ref={headerRef} className={styles.howItWorksHeader}>
          <div className={styles.howItWorksInner}>
            <h2>Як це працює?</h2>
            
            <div className={styles.progressBar}>
              <div 
                className={styles.progressBarFilled} 
                style={{ width: `${progressWidth}%` }}
              />
              <div className={styles.progressDots}>
                {howItWorksSteps.map((step) => (
                  <div
                    key={step.id}
                    className={`${styles.progressDot} ${
                      step.id <= activeStep ? styles.active : ""
                    }`}
                    onClick={() => handleDotClick(step.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={stepsRef} className={styles.stepsContainer}>
          {howItWorksSteps.map((step, index) => {
            const isLeft = index % 2 === 0;
            const isActive = step.id === activeStep;
            const isVisible = visibleSteps.has(step.id);
            const isEntering = enteringSteps.has(step.id);
            const isLeaving = leavingSteps.has(step.id);
            
            return (
              <Step
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                step={step}
                isActive={isActive}
                isLeft={isLeft}
                isVisible={isVisible}
                isEntering={isEntering}
                isLeaving={isLeaving}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
} 