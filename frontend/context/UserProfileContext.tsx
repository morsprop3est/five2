"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  avatar?: string;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
  };
}

interface SearchFilter {
  id: string;
  name: string;
  carBrand?: string;
  carModel?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: string;
  gearboxType?: string;
  isActive: boolean;
}

interface UserProfileContextType {
  profile: UserProfile | null;
  searchFilters: SearchFilter[];
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addSearchFilter: (filter: Omit<SearchFilter, "id">) => Promise<void>;
  updateSearchFilter: (id: string, data: Partial<SearchFilter>) => Promise<void>;
  deleteSearchFilter: (id: string) => Promise<void>;
  toggleFilterActive: (id: string) => Promise<void>;
  fetchProfile: () => Promise<void>;
  fetchSearchFilters: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

const encryptData = (data: string): string => {
  return btoa(data);
};

const decryptData = (encryptedData: string): string => {
  return atob(encryptedData);
};

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilter[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const PROFILE_CACHE_KEY = "user_profile_cache";
  const FILTERS_CACHE_KEY = "user_filters_cache";
  const CACHE_EXPIRY_KEY = "user_data_cache_expiry";
  const CACHE_DURATION = 10 * 60 * 1000; 

  const isCacheValid = (): boolean => {
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    if (!expiry) return false;
    return Date.now() < parseInt(expiry);
  };

  const saveToCache = (key: string, data: any) => {
    try {
      const encryptedData = encryptData(JSON.stringify(data));
      localStorage.setItem(key, encryptedData);
      localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
    } catch (error) {
      console.error("Error saving to cache:", error);
    }
  };

  const loadFromCache = (key: string): any => {
    try {
      const cachedData = localStorage.getItem(key);
      if (!cachedData) return null;
      
      const decryptedData = decryptData(cachedData);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error("Error loading from cache:", error);
      return null;
    }
  };

  const fetchProfile = async () => {
    if (isCacheValid()) {
      const cachedProfile = loadFromCache(PROFILE_CACHE_KEY);
      if (cachedProfile) {
        setProfile(cachedProfile);
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/user-profiles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
      saveToCache(PROFILE_CACHE_KEY, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      
      const cachedProfile = loadFromCache(PROFILE_CACHE_KEY);
      if (cachedProfile) {
        setProfile(cachedProfile);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchFilters = async () => {
    if (isCacheValid()) {
      const cachedFilters = loadFromCache(FILTERS_CACHE_KEY);
      if (cachedFilters) {
        setSearchFilters(cachedFilters);
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/user-search-filters`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch search filters");
      }

      const data = await response.json();
      setSearchFilters(data);
      saveToCache(FILTERS_CACHE_KEY, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      
      const cachedFilters = loadFromCache(FILTERS_CACHE_KEY);
      if (cachedFilters) {
        setSearchFilters(cachedFilters);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      saveToCache(PROFILE_CACHE_KEY, updatedProfile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const addSearchFilter = async (filter: Omit<SearchFilter, "id">) => {
    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/user-search-filters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(filter)
      });
      
      if (!response.ok) {
        throw new Error("Failed to add search filter");
      }

      const newFilter = await response.json();
      const updatedFilters = [...searchFilters, newFilter];
      setSearchFilters(updatedFilters);
      saveToCache(FILTERS_CACHE_KEY, updatedFilters);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const updateSearchFilter = async (id: string, data: Partial<SearchFilter>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/search-filters/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error("Failed to update search filter");
      }

      const updatedFilter = await response.json();
      const updatedFilters = searchFilters.map(filter => 
        filter.id === id ? updatedFilter : filter
      );
      setSearchFilters(updatedFilters);
      saveToCache(FILTERS_CACHE_KEY, updatedFilters);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSearchFilter = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/user/search-filters/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete search filter");
      }

      const updatedFilters = searchFilters.filter(filter => filter.id !== id);
      setSearchFilters(updatedFilters);
      saveToCache(FILTERS_CACHE_KEY, updatedFilters);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFilterActive = async (id: string) => {
    const filter = searchFilters.find(f => f.id === id);
    if (!filter) return;

    await updateSearchFilter(id, { isActive: !filter.isActive });
  };

  useEffect(() => {
    fetchProfile();
    fetchSearchFilters();
  }, []);

  return (
    <UserProfileContext.Provider value={{
      profile,
      searchFilters,
      isLoading,
      error,
      updateProfile,
      addSearchFilter,
      updateSearchFilter,
      deleteSearchFilter,
      toggleFilterActive,
      fetchProfile,
      fetchSearchFilters
    }}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error("useUserProfile must be used within UserProfileProvider");
  return context;
}; 