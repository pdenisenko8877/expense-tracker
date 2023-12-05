import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

import { Token } from 'src/modules/app/types';

const currentTimestamp = Math.floor(Date.now() / 1000);

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  token: Token;
  setToken: (token: Token) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: AuthContextProps) => {
  const [token, setToken] = useState<Token>(localStorage.getItem('token'));

  const decodedToken = token && jwtDecode(token);

  useEffect(() => {
    if (decodedToken && decodedToken.exp) {
      if (decodedToken.exp < currentTimestamp) {
        setToken(null);
      }
    }
  }, [decodedToken]);

  const saveToken = useCallback((token: Token) => {
    setToken(token);

    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken }}>{children}</AuthContext.Provider>
  );
};
