import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../components/AuthContext';

export const PrivateRoute = () => {
  const { token } = useAuth();

  return token ? <Outlet /> : <Navigate to="/login" />;
};
