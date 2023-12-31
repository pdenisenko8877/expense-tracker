import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Box, Stack, Paper } from '@mui/material';

import { Text, Password } from 'src/modules/ui/forms';
import { useMessages } from 'src/modules/messages/hooks/useMessages';
import { useAuth } from 'src/modules/auth/hooks/useAuth';

import { AuthData } from '../interfaces';
import { authLogin } from '../hooks/crud';

interface LoginFormProps {
  onSubmit: () => void;
}

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { setToken } = useAuth();
  const { show } = useMessages();

  const { mutate } = useMutation((data: AuthData) => authLogin(data, setToken), {
    onSuccess: () => {
      onSubmit();
      show({ message: 'Вітаємо!', severity: 'success' });
    },
    onError: ({ message }) => show({ message: `Помилка при логіні: ${message}` }),
  });

  const schema = useMemo(
    () =>
      yup.object({
        email: yup
          .string()
          .email('Електронна пошта повинна бути дійсною')
          .required("Обов'язкове поле"),
        password: yup
          .string()
          .min(8, 'Повинно бути більше 8 символів')
          .required("Обов'язкове поле"),
      }),
    [],
  );

  const { handleSubmit, control } = useForm<Omit<AuthData, 'firstname' | 'lastname'>>({
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
    <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Typography variant="h3" mb={1}>
          Вхід
        </Typography>
        <Stack spacing={3}>
          <Text label="Ел. пошта" name="email" type="email" control={control} required />
          <Password label="Пароль" name="password" type="password" control={control} required />
        </Stack>

        <Box mt={3}>
          <Button type="submit" fullWidth>
            Увійти
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
