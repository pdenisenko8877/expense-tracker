import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Box } from '@mui/material';

import { Text, Password } from 'src/modules/ui/forms';
import { Alert } from 'src/modules/ui/alert';
import { useAuth } from './AuthContext';
import { AuthData } from '../interfaces';
import { authLogin } from '../hooks/crud';

interface LoginFormProps {
  onSubmit: () => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { setToken } = useAuth();
  const [error, setError] = useState('');

  const { mutate } = useMutation((data: AuthData) => authLogin(data, setToken), {
    onSuccess: () => {
      onSubmit();
    },
    onError: error => setError(`Login failed: ${error}`),
  });

  const schema = useMemo(
    () =>
      yup.object({
        email: yup.string().required('Required field'),
        password: yup.string().required('Required field'),
      }),
    [],
  );

  const { handleSubmit, control } = useForm<AuthData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = useCallback(
    (data: AuthData) => {
      mutate(data);
    },
    [mutate],
  );

  return (
    <Box py={2}>
      <Alert show={!!error} message={error} severity="error" />

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography variant="h5">Login</Typography>

        <Text label="Email" name="email" type="email" control={control} required />
        <Password label="Password" name="password" type="password" control={control} required />

        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Box>
  );
};
