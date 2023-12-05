import { useNavigate } from 'react-router-dom';

import { RegistrationForm } from 'src/modules/auth/components/RegistrationForm';

export const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return <RegistrationForm onSubmit={handleLogin} />;
};
