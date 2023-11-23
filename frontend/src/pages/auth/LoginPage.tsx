import { Link } from 'react-router-dom';
import { LoginForm } from 'src/modules/auth/components/LoginForm';

export const LoginPage = () => {
  const handleLogin = () => {
    console.log('Logged in successfully');
  };

  return (
    <div>
      <LoginForm onSubmit={handleLogin} />
      <Link to="/register">Don't have an account? Register here.</Link>
    </div>
  );
};
