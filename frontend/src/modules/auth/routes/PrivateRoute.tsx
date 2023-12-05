import { Outlet, Navigate } from 'react-router-dom';

import { MainLayout } from 'src/modules/layouts';
import { useAuth } from 'src/modules/auth/hooks/useAuth';

export const PrivateRoute = () => {
  const { token } = useAuth();

  return token ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" />
  );
};
