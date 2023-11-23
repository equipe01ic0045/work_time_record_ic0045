import React, { createContext, useContext, useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

type user = {
  userId: number;
  full_name: string;
  email: string;
};

interface AuthContextProps {
  user: user | null | undefined;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<user | null | undefined>(null);

  function getCookie(cookieName: string): string | null {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

    return null;
  }

  function login() {
    const token = getCookie("token");
    if (token) {
      const decodedToken = jwtDecode(token) as user;
      setUser(decodedToken);
    } else{
      setUser(undefined);
    }
  }

  function logout() {
    setUser(null);
    document.cookie = `token=; expires=${new Date()}; path=/;`;
    redirect("/auth");
  }

  useEffect(() => {
    login();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
