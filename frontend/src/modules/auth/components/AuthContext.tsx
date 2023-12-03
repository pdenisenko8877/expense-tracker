import { createContext, useContext, useState, ReactNode, FC } from 'react';

import { Token } from 'src/modules/app/types';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  token: Token;
  setToken: (token: Token) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [token, setToken] = useState<Token>(localStorage.getItem('token'));

  const saveToken = (token: Token) => {
    setToken(token);
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken: saveToken }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
