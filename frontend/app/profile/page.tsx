"use client";

import React, { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Navigation from "../../components/Navigation/Navigation";
import { useUserProfile } from "../../context/UserProfileContext";
import styles from "./page.module.scss";

const Profile: React.FC = () => {
  const { 
    profile, 
    searchFilters, 
    isLoading, 
    error, 
    updateProfile, 
    addSearchFilter, 
    updateSearchFilter, 
    deleteSearchFilter, 
    toggleFilterActive 
  } = useUserProfile();

  const [activeTab, setActiveTab] = useState<'profile' | 'filters'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingFilter, setIsAddingFilter] = useState(false);
  const [editingFilterId, setEditingFilterId] = useState<string | null>(null);

  const [profileForm, setProfileForm] = useState({
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    phone: profile?.phone || '',
    city: profile?.city || '',
    notifications: profile?.preferences.notifications || false,
    emailUpdates: profile?.preferences.emailUpdates || false
  });

  const [filterForm, setFilterForm] = useState({
    name: '',
    carBrand: '',
    carModel: '',
    minPrice: '',
    maxPrice: '',
    minYear: '',
    maxYear: '',
    fuelType: '',
    gearboxType: ''
  });

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      firstName: profileForm.firstName,
      lastName: profileForm.lastName,
      phone: profileForm.phone,
      city: profileForm.city,
      preferences: {
        notifications: profileForm.notifications,
        emailUpdates: profileForm.emailUpdates
      }
    });
    setIsEditing(false);
  };

  const handleFilterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const filterData = {
      name: filterForm.name,
      carBrand: filterForm.carBrand || undefined,
      carModel: filterForm.carModel || undefined,
      minPrice: filterForm.minPrice ? parseInt(filterForm.minPrice) : undefined,
      maxPrice: filterForm.maxPrice ? parseInt(filterForm.maxPrice) : undefined,
      minYear: filterForm.minYear ? parseInt(filterForm.minYear) : undefined,
      maxYear: filterForm.maxYear ? parseInt(filterForm.maxYear) : undefined,
      fuelType: filterForm.fuelType || undefined,
      gearboxType: filterForm.gearboxType || undefined,
      isActive: true
    };

    if (editingFilterId) {
      await updateSearchFilter(editingFilterId, filterData);
      setEditingFilterId(null);
    } else {
      await addSearchFilter(filterData);
      setIsAddingFilter(false);
    }
    
    setFilterForm({
      name: '',
      carBrand: '',
      carModel: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      fuelType: '',
      gearboxType: ''
    });
  };

  const handleEditFilter = (filter: any) => {
    setEditingFilterId(filter.id);
    setFilterForm({
      name: filter.name,
      carBrand: filter.carBrand || '',
      carModel: filter.carModel || '',
      minPrice: filter.minPrice?.toString() || '',
      maxPrice: filter.maxPrice?.toString() || '',
      minYear: filter.minYear?.toString() || '',
      maxYear: filter.maxYear?.toString() || '',
      fuelType: filter.fuelType || '',
      gearboxType: filter.gearboxType || ''
    });
  };

  const handleCancelEdit = () => {
    setEditingFilterId(null);
    setIsAddingFilter(false);
    setFilterForm({
      name: '',
      carBrand: '',
      carModel: '',
      minPrice: '',
      maxPrice: '',
      minYear: '',
      maxYear: '',
      fuelType: '',
      gearboxType: ''
    });
  };

  return (
    <ProtectedRoute>
      <div className={styles.profile}>
        <Navigation />
        
        <main className={styles.main}>
          <div className={styles.container}>
            <header className={styles.header}>
              <h1>Профіль</h1>
            </header>

            {error && (
              <div className={styles.error}>
                Помилка: {error}
              </div>
            )}

            <div className={styles.tabs}>
              <button 
                className={`${styles.tab} ${activeTab === 'profile' ? styles.active : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Особисті дані
              </button>
              <button 
                className={`${styles.tab} ${activeTab === 'filters' ? styles.active : ''}`}
                onClick={() => setActiveTab('filters')}
              >
                Збережені фільтри ({searchFilters.length})
              </button>
            </div>

            {activeTab === 'profile' && (
              <div className={styles.profileSection}>
                {isLoading ? (
                  <div className={styles.loading}>Завантаження...</div>
                ) : (
                  <form onSubmit={handleProfileSubmit} className={styles.profileForm}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName">Ім'я</label>
                      <input
                        type="text"
                        id="firstName"
                        value={profileForm.firstName}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
                        disabled={!isEditing}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="lastName">Прізвище</label>
                      <input
                        type="text"
                        id="lastName"
                        value={profileForm.lastName}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
                        disabled={!isEditing}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="phone">Телефон</label>
                      <input
                        type="tel"
                        id="phone"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="city">Місто</label>
                      <input
                        type="text"
                        id="city"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm(prev => ({ ...prev, city: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={profileForm.notifications}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, notifications: e.target.checked }))}
                          disabled={!isEditing}
                        />
                        Отримувати сповіщення
                      </label>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={profileForm.emailUpdates}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, emailUpdates: e.target.checked }))}
                          disabled={!isEditing}
                        />
                        Email оновлення
                      </label>
                    </div>

                    <div className={styles.formActions}>
                      {isEditing ? (
                        <>
                          <button type="submit" className={styles.saveButton}>
                            Зберегти
                          </button>
                          <button 
                            type="button" 
                            className={styles.cancelButton}
                            onClick={() => setIsEditing(false)}
                          >
                            Скасувати
                          </button>
                        </>
                      ) : (
                        <button 
                          type="button" 
                          className={styles.editButton}
                          onClick={() => setIsEditing(true)}
                        >
                          Редагувати
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'filters' && (
              <div className={styles.filtersSection}>
                <div className={styles.filtersHeader}>
                  <h3>Збережені фільтри пошуку</h3>
                  <button 
                    className={styles.addFilterButton}
                    onClick={() => setIsAddingFilter(true)}
                  >
                    Додати фільтр
                  </button>
                </div>

                {isAddingFilter && (
                  <form onSubmit={handleFilterSubmit} className={styles.filterForm}>
                    <h4>Новий фільтр</h4>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="filterName">Назва фільтра</label>
                        <input
                          type="text"
                          id="filterName"
                          value={filterForm.name}
                          onChange={(e) => setFilterForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="carBrand">Марка</label>
                        <input
                          type="text"
                          id="carBrand"
                          value={filterForm.carBrand}
                          onChange={(e) => setFilterForm(prev => ({ ...prev, carBrand: e.target.value }))}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="carModel">Модель</label>
                        <input
                          type="text"
                          id="carModel"
                          value={filterForm.carModel}
                          onChange={(e) => setFilterForm(prev => ({ ...prev, carModel: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="minPrice">Мін. ціна</label>
                        <input
                          type="number"
                          id="minPrice"
                          value={filterForm.minPrice}
                          onChange={(e) => setFilterForm(prev => ({ ...prev, minPrice: e.target.value }))}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="maxPrice">Макс. ціна</label>
                        <input
                          type="number"
                          id="maxPrice"
                          value={filterForm.maxPrice}
                          onChange={(e) => setFilterForm(prev => ({ ...prev, maxPrice: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="minYear">Мін. рік</label>
                        <input
                          type="number"
                          id="minYear"
                          value={filterForm.minYear}
                          onChange={(e) => setFilterForm(prev => ({ ...prev, minYear: e.target.value }))}
                        />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="maxYear">Макс. рік</label>
                        <input
                          type="number"
                          id="maxYear"
                          value={filterForm.maxYear}
                          onChange={(e) => setFilterForm(prev => ({ ...prev, maxYear: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label htmlFor="fuelType">Тип палива</label>
                        <select
                          id="fuelType"
                          value={filterForm.fuelType}
                          onChange={(e) => setFilterForm(prev => ({ ...prev, fuelType: e.target.value }))}
                        >
                          <option value="">Будь-який</option>
                          <option value="Бензин">Бензин</option>
                          <option value="Дизель">Дизель</option>
                          <option value="Газ">Газ</option>
                          <option value="Електро">Електро</option>
                          <option value="Гібрид">Гібрид</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="gearboxType">Коробка передач</label>
                        <select
                          id="gearboxType"
                          value={filterForm.gearboxType}
                          onChange={(e) => setFilterForm(prev => ({ ...prev, gearboxType: e.target.value }))}
                        >
                          <option value="">Будь-яка</option>
                          <option value="Механічна">Механічна</option>
                          <option value="Автоматична">Автоматична</option>
                          <option value="Робот">Робот</option>
                          <option value="Варіатор">Варіатор</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formActions}>
                      <button type="submit" className={styles.saveButton}>
                        Зберегти фільтр
                      </button>
                      <button 
                        type="button" 
                        className={styles.cancelButton}
                        onClick={handleCancelEdit}
                      >
                        Скасувати
                      </button>
                    </div>
                  </form>
                )}

                <div className={styles.filtersList}>
                  {searchFilters.length === 0 ? (
                    <div className={styles.emptyState}>
                      <p>У вас поки немає збережених фільтрів</p>
                    </div>
                  ) : (
                    searchFilters.map((filter) => (
                      <div key={filter.id} className={styles.filterCard}>
                        <div className={styles.filterHeader}>
                          <h4>{filter.name}</h4>
                          <div className={styles.filterActions}>
                            <button
                              className={`${styles.toggleButton} ${filter.isActive ? styles.active : ''}`}
                              onClick={() => toggleFilterActive(filter.id)}
                            >
                              {filter.isActive ? 'Активний' : 'Неактивний'}
                            </button>
                            <button
                              className={styles.editButton}
                              onClick={() => handleEditFilter(filter)}
                            >
                              Редагувати
                            </button>
                            <button
                              className={styles.deleteButton}
                              onClick={() => deleteSearchFilter(filter.id)}
                            >
                              Видалити
                            </button>
                          </div>
                        </div>
                        
                        <div className={styles.filterDetails}>
                          {filter.carBrand && <span>Марка: {filter.carBrand}</span>}
                          {filter.carModel && <span>Модель: {filter.carModel}</span>}
                          {filter.minPrice && <span>Ціна від: {filter.minPrice} грн</span>}
                          {filter.maxPrice && <span>Ціна до: {filter.maxPrice} грн</span>}
                          {filter.minYear && <span>Рік від: {filter.minYear}</span>}
                          {filter.maxYear && <span>Рік до: {filter.maxYear}</span>}
                          {filter.fuelType && <span>Паливо: {filter.fuelType}</span>}
                          {filter.gearboxType && <span>Коробка: {filter.gearboxType}</span>}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Profile; 