import { useNavigate } from 'react-router-dom';

import { RegistrationForm } from 'src/modules/auth/components/RegistrationForm';

export const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('Registration in successfully');
    navigate('/login');
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleLogin} />
    </div>
  );
};
