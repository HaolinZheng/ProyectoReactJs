// src/contexts/AuthProvider.tsx
import React, { ReactNode, useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { isLoged, logOut } from "../config/axios";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await isLoged();
        if (response.data) {
          login();
        } else {
          logout()
        }
      } catch (error) {
        logout()
        console.error("Hubo un error en la verificacion:", error);
      }
    };
    checkAuthStatus();
  }, []);
  
  const login = () => {
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
    logOut();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated , login , logout }}>
      {children}
    </AuthContext.Provider>
  );
};
