import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography, Box } from '@mui/material';

import { Text, Password } from 'src/modules/ui/forms';
import { AuthData } from '../interfaces';
import { authRegisterUser } from '../hooks/crud';

interface RegistrationFormProps {
  onSubmit: () => void;
}

export const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const { mutate } = useMutation(authRegisterUser, {
    onSuccess: () => {
      onSubmit();
    },
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

  const handleFormSubmit = (data: AuthData) => {
    mutate(data);
  };

  return (
    <Box py={2}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography variant="h5">Register</Typography>

        <Text label="Email" name="email" type="email" control={control} required />
        <Password label="Password" name="password" type="password" control={control} required />

        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Box>
  );
};
