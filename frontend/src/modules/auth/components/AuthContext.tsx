import { createContext, useContext, useState, ReactNode, FC } from 'react';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  token: string | null;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: FC<AuthContextProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const saveToken = (token: string | null) => {
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
