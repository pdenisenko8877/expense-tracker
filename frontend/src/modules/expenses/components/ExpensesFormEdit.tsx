import { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Grid } from '@mui/material';

import { Text, DatePicker } from 'src/modules/ui/forms';
import { useMessages } from 'src/modules/messages/hooks/useMessages';
import { Token } from 'src/modules/app/types';
import { Loader } from 'src/modules/ui/loader';

import { categoryOptions, currencyOptions } from '../constants';
import { Expense } from '../interfaces';
import { updateExpense, fetchOneExpense } from '../hooks/crud';

interface ExpenseFormProps {
  token: Token;
  editId: number;
}

export const ExpensesFormEdit = ({ editId, token }: ExpenseFormProps) => {
  const queryClient = useQueryClient();
  const { show } = useMessages();

  const schema = yup.object().shape({
    amount: yup.number().required("Обов'язкове поле").positive('Сума має бути позитивною'),
    currency: yup.string().required("Обов'язкове поле"),
    category: yup.string().required("Обов'язкове поле"),
    date: yup.date().required("Обов'язкове поле"),
  });

  // Use the useQuery hook to fetch a single expense
  const {
    data: oneExpense,
    isLoading,
    isError,
  } = useQuery(['expense', editId], () => fetchOneExpense(editId, token));

  // Define the mutation for updating an expense
  const updateExpenseMutation = useMutation((data: Expense) => updateExpense(data, token), {
    onSuccess: () => {
      // refetch the expenses data
      queryClient.invalidateQueries(['allExpenses']);

      show({ message: 'Ваші витрати успішно додані', severity: 'success' });
    },
    onError: ({ message }) => show({ message: `Помилка: ${message}` }),
  });

  const { control, handleSubmit, formState, reset } = useForm<Expense>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!isLoading && !isError && oneExpense) {
      reset({
        amount: oneExpense.amount,
        currency: oneExpense.currency,
        category: oneExpense.category,
        date: oneExpense.date,
      });
    }
  }, [isError, isLoading, oneExpense, reset]);

  const handleFormSubmit = useCallback(
    (data: Expense) => {
      updateExpenseMutation.mutate({ id: editId, ...data });
    },
    [editId, updateExpenseMutation],
  );

  return (
    <Box py={1}>
      <Loader isLoading={isLoading} />

      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Grid container spacing={3}>
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
            Редагувати
          </Button>
        </Box>
      </form>
    </Box>
  );
};
