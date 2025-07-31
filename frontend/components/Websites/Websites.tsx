"use client";

import styles from "./Websites.module.scss";
import Slider from "../Slider/Slider";
import { websitesData } from "../../app/data/websites";

export default function Websites() {
  return (
    <section className={styles.websites}>
      <div className="container">
        <div className={styles.websitesHeader}>
          <h2>Сайти, які ми використовуємо</h2>
          <p>Надійні платформи для купівлі та продажу автомобілів</p>
        </div>
        
        <div className={styles.websitesSlider}>
          <Slider 
            items={websitesData}
            autoPlay={true}
            autoPlayInterval={4000}
            showDots={true}
            showArrows={true}
            className={styles.websitesSliderCustom}
            slidesToShow={3}
          />
        </div>
      </div>
    </section>
  );
} 