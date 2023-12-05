import { Outlet, Navigate } from 'react-router-dom';

import { AuthLayout } from 'src/modules/layouts';
import { useAuth } from 'src/modules/auth/hooks/useAuth';

export const GuestRoute = () => {
  const { token } = useAuth();

  return !token ? (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ) : (
    <Navigate to="/" />
  );
};
