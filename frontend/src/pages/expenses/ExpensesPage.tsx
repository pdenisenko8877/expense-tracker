import { useState, useCallback, useEffect, useMemo } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Typography } from '@mui/material';

import { useAuth } from 'src/modules/auth/components/AuthContext';
import { Loader } from 'src/modules/ui/loader';
import { ExpensesForm } from 'src/modules/expenses/components/ExpensesForm';
import { ExpensesFormEdit } from 'src/modules/expenses/components/ExpensesFormEdit';
import { ExpensesList } from 'src/modules/expenses/components/ExpensesList';
import { ExpensesFilterForm } from 'src/modules/expenses/components/ExpensesFilterForm';
import { Expense } from 'src/modules/expenses/interfaces';
import { filterByCurrency, filterByDate } from 'src/modules/expenses/utils';
import { fetchExpenses, deleteExpense } from 'src/modules/expenses/hooks/crud';
import { useMessages } from 'src/modules/messages/hooks/useMessages';

export const ExpensesPage = () => {
  const { setToken, token } = useAuth();
  const queryClient = useQueryClient();
  const { show } = useMessages();

  const handleLogout = useCallback(() => setToken(null), [setToken]);

  const [isLoading, seIsLoading] = useState<boolean>(true);
  const [expensesId, setExpensesId] = useState<number>();

  // Use React Query to fetch all expenses
  const { data, isError } = useQuery(['allExpenses'], () => fetchExpenses(token));

  const initialData = useMemo(() => {
    if (data && !isError) {
      seIsLoading(false);

      return data.filter(
        (expense: Expense) => filterByDate(expense) && filterByCurrency(expense, 'UAH'),
      );
    }
  }, [data, isError]);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    if (!isLoading) {
      setExpenses(initialData);
    }
  }, [initialData, isLoading]);

  useEffect(() => {
    if (isError) {
      show({ message: 'Помилка отримання даних. Спробуйте пізніше' });
    }
  }, [isError, show]);

  const deleteExpenseMutation = useMutation((id: number) => deleteExpense(id, token), {
    onSuccess: () => {
      // refetch the expenses data
      queryClient.invalidateQueries(['allExpenses']);

      show({ message: 'Запис успішно видалено', severity: 'success' });
    },
    onError: ({ message }) => show({ message: `Помилка видалення: ${message}` }),
  });

  const handleDelete = useCallback(
    (id: number) => {
      deleteExpenseMutation.mutate(id);
    },
    [deleteExpenseMutation],
  );

  const handleEditId = useCallback((id: number) => {
    setExpensesId(id);
  }, []);

  const handleFiltered = useCallback((filteredExpenses: Expense[]) => {
    setExpenses(filteredExpenses);
  }, []);

  const handleReset = useCallback(
    (reset: boolean) => {
      if (reset && !isLoading && !isError) {
        setExpenses(initialData);
      }
    },
    [isError, isLoading, initialData],
  );

  return (
    <Box px={5} py={3}>
      <Typography variant="h3">Головна сторінка</Typography>
      <Button onClick={handleLogout}>Вийти</Button>

      <ExpensesForm token={token} />

      {expensesId && <ExpensesFormEdit token={token} editId={expensesId} />}

      <Loader isLoading={isLoading}>
        <ExpensesFilterForm expenses={data} onSubmit={handleFiltered} onReset={handleReset} />

        <ExpensesList expenses={expenses} onDelete={handleDelete} onEdit={handleEditId} />
      </Loader>
    </Box>
  );
};
