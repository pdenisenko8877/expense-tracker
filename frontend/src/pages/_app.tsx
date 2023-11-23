import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from 'src/modules/auth/components/AuthContext';
import { PrivateRoute } from 'src/modules/auth/routes/PrivateRoute';

import { LoginPage } from './auth/LoginPage';
import { RegistrationPage } from './auth/RegistrationPage';
import { DashboardPage } from './dashboard/DashboardPage';

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
