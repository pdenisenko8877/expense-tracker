import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Box, Stack, Paper } from '@mui/material';

import { Text, Password } from 'src/modules/ui/forms';
import { useMessages } from 'src/modules/messages/hooks/useMessages';

import { AuthRegisterData } from '../interfaces';
import { authRegisterUser } from '../hooks/crud';

interface RegistrationFormProps {
  onSubmit: () => void;
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const { show } = useMessages();

  const { mutate } = useMutation(authRegisterUser, {
    onSuccess: () => {
      onSubmit();
      show({ message: 'Ви успішно створили аккаунт', severity: 'success' });
    },
  });

  const schema = useMemo(
    () =>
      yup.object({
        firstname: yup.string().required("Обов'язкове поле"),
        lastname: yup.string().required("Обов'язкове поле"),
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

  const { handleSubmit, control } = useForm<AuthRegisterData>({
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = (data: AuthRegisterData) => {
    mutate(data);
  };

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Typography variant="h3" mb={1}>
          Реєстрація
        </Typography>

        <Stack spacing={3}>
          <Text label="Ім'я" name="firstname" control={control} required />
          <Text label="Прізвище" name="lastname" control={control} required />
          <Text label="Ел. пошта" name="email" type="email" control={control} required />
          <Password
            label="Придумайте пароль"
            name="password"
            type="password"
            control={control}
            required
          />
        </Stack>
        <Box mt={3}>
          <Button type="submit" fullWidth>
            Реєстрація
          </Button>
        </Box>
      </form>
    </Paper>
  );
};
