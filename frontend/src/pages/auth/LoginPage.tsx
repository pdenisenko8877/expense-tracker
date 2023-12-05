import { Link, useNavigate } from 'react-router-dom';

import { LoginForm } from 'src/modules/auth/components/LoginForm';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <LoginForm onSubmit={handleLogin} />
      <Link to="/register">Ще немає акаунту? Зареєструватися</Link>
    </>
  );
};
