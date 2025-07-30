"use client";

import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Navigation from "../../components/Navigation/Navigation";
import { useListings } from "../../context/ListingsContext";
import { useUserProfile } from "../../context/UserProfileContext";
import styles from "./page.module.scss";

const Dashboard: React.FC = () => {
  const { listings, isLoading, error, refreshListings } = useListings();
  const { profile } = useUserProfile();

  return (
    <ProtectedRoute>
      <div className={styles.dashboard}>
        <Navigation />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <header className={styles.header}>
              <div className={styles.welcome}>
                <h1>Вітаємо, {profile?.firstName || "користувач"}!</h1>
                <p>Знайдіть свою ідеальну машину</p>
              </div>
              
              <button 
                className={styles.refreshButton}
                onClick={refreshListings}
                disabled={isLoading}
              >
                {isLoading ? "Оновлення..." : "Оновити"}
              </button>
            </header>

            {error && (
              <div className={styles.error}>
                Помилка завантаження: {error}
              </div>
            )}

            {isLoading ? (
              <div className={styles.loading}>
                Завантаження оголошень...
              </div>
            ) : (
              <div className={styles.listingsGrid}>
                {listings.length === 0 ? (
                  <div className={styles.emptyState}>
                    <h3>Оголошень поки немає</h3>
                    <p>Спробуйте оновити сторінку або зачекайте трохи</p>
                  </div>
                ) : (
                  listings.map((listing) => (
                    <div key={listing.id} className={styles.listingCard}>
                      <div className={styles.imageContainer}>
                        {listing.images.length > 0 ? (
                          <img 
                            src={listing.images[0]} 
                            alt={listing.title}
                            className={styles.listingImage}
                          />
                        ) : (
                          <div className={styles.noImage}>
                            Немає фото
                          </div>
                        )}
                      </div>
                      
                      <div className={styles.listingInfo}>
                        <h3 className={styles.listingTitle}>{listing.title}</h3>
                        <p className={styles.listingPrice}>
                          {listing.price.toLocaleString()} грн
                        </p>
                        
                        <div className={styles.listingDetails}>
                          <span>{listing.carBrand} {listing.carModel}</span>
                          <span>{listing.year} рік</span>
                          <span>{listing.mileage.toLocaleString()} км</span>
                        </div>
                        
                        <div className={styles.listingSpecs}>
                          <span>{listing.fuelType}</span>
                          <span>{listing.gearboxType}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard; 