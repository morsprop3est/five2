"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Listing {
  id: string;
  title: string;
  price: number;
  description: string;
  images: string[];
  carBrand: string;
  carModel: string;
  year: number;
  mileage: number;
  fuelType: string;
  gearboxType: string;
  createdAt: string;
}

interface ListingsContextType {
  listings: Listing[];
  isLoading: boolean;
  error: string | null;
  fetchListings: () => Promise<void>;
  refreshListings: () => Promise<void>;
  getListingById: (id: string) => Listing | undefined;
}

const ListingsContext = createContext<ListingsContextType | undefined>(undefined);

const encryptData = (data: string): string => {
  return btoa(data);
};

const decryptData = (encryptedData: string): string => {
  return atob(encryptedData); 
};

export const ListingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const CACHE_KEY = "listings_cache";
  const CACHE_EXPIRY_KEY = "listings_cache_expiry";
  const CACHE_DURATION = 5 * 60 * 1000;

  const isCacheValid = (): boolean => {
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    if (!expiry) return false;
    return Date.now() < parseInt(expiry);
  };

  const saveToCache = (data: Listing[]) => {
    try {
      const encryptedData = encryptData(JSON.stringify(data));
      localStorage.setItem(CACHE_KEY, encryptedData);
      localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
    } catch (error) {
      console.error("Error saving to cache:", error);
    }
  };

  const loadFromCache = (): Listing[] | null => {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (!cachedData) return null;
      
      const decryptedData = decryptData(cachedData);
      return JSON.parse(decryptedData);
    } catch (error) {
      console.error("Error loading from cache:", error);
      return null;
    }
  };

  const fetchListings = async () => {
    if (isCacheValid()) {
      const cachedListings = loadFromCache();
      if (cachedListings) {
        setListings(cachedListings);
        return;
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/listings`);
      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      setListings(data);
      saveToCache(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      
      const cachedListings = loadFromCache();
      if (cachedListings) {
        setListings(cachedListings);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshListings = async () => {
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_EXPIRY_KEY);
    await fetchListings();
  };

  const getListingById = (id: string): Listing | undefined => {
    return listings.find(listing => listing.id === id);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  return (
    <ListingsContext.Provider value={{
      listings,
      isLoading,
      error,
      fetchListings,
      refreshListings,
      getListingById
    }}>
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (!context) throw new Error("useListings must be used within ListingsProvider");
  return context;
}; 