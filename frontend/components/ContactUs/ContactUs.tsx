"use client";

import { useState } from "react";
import styles from "./ContactUs.module.scss";
import Button from "../Button/Button";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className={styles.contactUs}>
      <div className="container">
        <div className={styles.contactUsHeader}>
          <h2>Зв'яжіться з нами</h2>
        </div>
        
        <div className={styles.contactUsContent}>
          <div className={styles.contactUsLeft}>
            <p>
              Якщо у вас виникли запитання,{" "}
              <span className={styles.highlight}>заповніть форму</span>{" "}
              і ми обов'язково зв'яжемося з вами найближчим часом.
            </p>
          </div>
          
          <div className={styles.contactUsRight}>
            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше ім'я"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Електронна пошта"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  required
                />
              </div>
              
              <div className={styles.formRow}>
                <textarea
                  name="message"
                  placeholder="Ваше повідомлення"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  rows={6}
                  required
                />
              </div>
              
              <div className={styles.formRow}>
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="medium"
                  waveEffect={true}
                  className={styles.submitButton}
                >
                  Відправити
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 