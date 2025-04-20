import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      try {
        const { user, token, expiry } = JSON.parse(stored);

        if (expiry > Date.now()) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setAuth({ user, token });
        } else {
          localStorage.removeItem("auth");
        }
      } catch {
        localStorage.removeItem("auth");
      }
    }
    setLoading(false);
  }, []);

  const login = (user, token) => {
    const expiry = Date.now() + 2 * 60 * 60 * 1000; // 2 hours
    localStorage.setItem("auth", JSON.stringify({ user, token, expiry }));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setAuth({ user, token });
  };

  const logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("auth");
    setAuth({ user: null, token: "" });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
