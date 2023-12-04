import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Grid } from '@mui/material';

import { Text, DatePicker } from 'src/modules/ui/forms';
import { useMessages } from 'src/modules/messages/hooks/useMessages';
import { Token } from 'src/modules/app/types';

import { categoryOptions, currencyOptions } from '../constants';
import { Expense } from '../interfaces';
import { createExpense } from '../hooks/crud';

interface ExpenseFormProps {
  token: Token;
}

export const ExpensesForm = ({ token }: ExpenseFormProps) => {
  const queryClient = useQueryClient();
  const { show } = useMessages();

  const schema = yup.object().shape({
    amount: yup.number().required("Обов'язкове поле").positive('Сума має бути позитивною'),
    currency: yup.string().required("Обов'язкове поле"),
    category: yup.string().required("Обов'язкове поле"),
    date: yup.date().required("Обов'язкове поле"),
  });

  // Create mutation for creating an expense
  const createExpenseMutation = useMutation((data: Expense) => createExpense(data, token), {
    onSuccess: () => {
      // refetch the expenses data
      queryClient.invalidateQueries(['allExpenses']);

      show({ message: 'Ваші витрати успішно додані', severity: 'success' });
      reset();
    },
    onError: ({ message }) => show({ message: `Помилка: ${message}` }),
  });

  const { control, handleSubmit, formState, reset } = useForm<Expense>({
    defaultValues: {
      amount: undefined,
      currency: 'UAH',
      category: '',
      date: undefined,
    },
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = useCallback(
    (data: Expense) => {
      createExpenseMutation.mutate(data);
    },
    [createExpenseMutation],
  );

  return (
    <Box py={1}>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Text label="Введіть витрати" name="amount" type="number" control={control} required />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Text
              label="Валюта"
              name="currency"
              control={control}
              required
              select
              options={currencyOptions}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Text
              label="Категорія"
              name="category"
              control={control}
              required
              select
              options={categoryOptions}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <DatePicker label="Дата" name="date" control={control} required />
          </Grid>
        </Grid>

        <Box pt={3}>
          <Button type="submit" disabled={formState.isSubmitting}>
            Зберегти
          </Button>
        </Box>
      </form>
    </Box>
  );
};
