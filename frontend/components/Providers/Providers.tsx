"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "../../context/ThemeContext";
import { AuthProvider } from "../../context/AuthContext";
import { ListingsProvider } from "../../context/ListingsContext";
import { UserProfileProvider } from "../../context/UserProfileContext";

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <AuthProvider>
          <ListingsProvider>
            <UserProfileProvider>
              {children}
            </UserProfileProvider>
          </ListingsProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
} 