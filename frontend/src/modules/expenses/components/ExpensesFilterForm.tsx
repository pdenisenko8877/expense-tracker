import React, { useCallback, useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Button, Grid, Stack, Paper, Typography } from '@mui/material';
import { DatePicker, Text } from 'src/modules/ui/forms';

import { categoryOptions, currencyOptions } from '../constants';
import { filterByDate, filterByCurrency, filterByCategory } from '../utils';
import { Expense } from '../interfaces';

interface ExpenseFormProps {
  expenses: Expense[];
  onSubmit: (filteredExpenses: Expense[]) => void;
  onReset: (reset: boolean) => void;
}

export const ExpensesFilterForm = ({ expenses, onSubmit, onReset }: ExpenseFormProps) => {
  const schema = useMemo(
    () =>
      yup.object().shape({
        selectedCurrency: yup.string(),
        selectedCategory: yup.string(),
        startDate: yup.date(),
        endDate: yup.date(),
      }),
    [],
  );

  const { reset, handleSubmit, control } = useForm({
    defaultValues: {
      selectedCurrency: 'UAH',
      selectedCategory: '',
      startDate: undefined,
      endDate: undefined,
    },
    resolver: yupResolver(schema),
  });

  const filter = useWatch({ control });

  const filteredExpenses = useMemo(
    () =>
      expenses.filter(
        expense =>
          filterByDate(expense, filter.startDate, filter.endDate) &&
          filterByCategory(expense, filter.selectedCategory) &&
          filterByCurrency(expense, filter.selectedCurrency),
      ),
    [expenses, filter],
  );

  const handleFormSubmit = useCallback(
    () => onSubmit(filteredExpenses),
    [filteredExpenses, onSubmit],
  );

  const handleFormReset = useCallback(() => {
    reset();
    onReset(true);
  }, [onReset, reset]);

  return (
    <Paper elevation={0} sx={{ p: 3, mb: 6 }}>
      <Typography variant="h3" mb={3}>
        Фільтрувати
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Text
              label="Валюта"
              name="selectedCurrency"
              control={control}
              select
              options={currencyOptions}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Text
              label="Категорія"
              name="selectedCategory"
              control={control}
              select
              options={categoryOptions}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DatePicker label="Початкова дата" name="startDate" control={control} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <DatePicker label="Кінцева дата" name="endDate" control={control} />
          </Grid>
        </Grid>

        <Stack direction="row" spacing={3} mt={3}>
          <Button onClick={handleFormReset}>Скинути</Button>
          <Button type="submit">Фільтрувати</Button>
        </Stack>
      </form>
    </Paper>
  );
};
