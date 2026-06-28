/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";
import type { User } from "../../types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("alterno_user");
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      localStorage.removeItem("alterno_user");
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("alterno_token"),
  );
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("alterno_user", JSON.stringify(updatedUser));
  };
  const login = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("alterno_token", token);
    localStorage.setItem("alterno_user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("alterno_token");
    localStorage.removeItem("alterno_user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, updateUser, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
