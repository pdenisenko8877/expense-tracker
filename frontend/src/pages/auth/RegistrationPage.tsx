import { RegistrationForm } from 'src/modules/auth/components/RegistrationForm';

export const RegistrationPage = () => {
  const handleLogin = () => {
    console.log('Registration in successfully');
  };

  return (
    <div>
      <RegistrationForm onSubmit={handleLogin} />
    </div>
  );
};
