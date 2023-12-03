import { Route, Routes } from 'react-router-dom';

import { AuthProvider } from 'src/modules/auth/components/AuthContext';
import { PrivateRoute } from 'src/modules/auth/routes/PrivateRoute';
import { GuestRoute } from 'src/modules/auth/routes/GuestRoute';

import { LoginPage } from './auth/LoginPage';
import { RegistrationPage } from './auth/RegistrationPage';
import { ExpensesPage } from './expenses/ExpensesPage';
import { NotFoundPage } from './system/NotFoundPage';

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/register" element={<GuestRoute />}>
          <Route path="/register" element={<RegistrationPage />} />
        </Route>

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<ExpensesPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};
