import { useState, useCallback, useEffect } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Typography } from '@mui/material';

import { useAuth } from 'src/modules/auth/components/AuthContext';
import { Loader } from 'src/modules/ui/loader';
import { ExpensesForm } from 'src/modules/expenses/components/ExpensesForm';
import { ExpensesFormEdit } from 'src/modules/expenses/components/ExpensesFormEdit';
import { ExpensesList } from 'src/modules/expenses/components/ExpensesList';
import { ExpensesFilterForm } from 'src/modules/expenses/components/ExpensesFilterForm';
import { Expense } from 'src/modules/expenses/interfaces';
import { fetchExpenses, deleteExpense } from 'src/modules/expenses/hooks/crud';
import { useMessages } from 'src/modules/messages/hooks/useMessages';

export const ExpensesPage = () => {
  const { setToken, token } = useAuth();
  const queryClient = useQueryClient();
  const { show } = useMessages();

  const handleLogout = useCallback(() => setToken(null), [setToken]);

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [expensesId, setExpensesId] = useState<number>();

  // Use React Query to fetch all expenses
  const { data, isLoading, isError } = useQuery(['allExpenses'], () => fetchExpenses(token));

  useEffect(() => {
    if (!isLoading && !isError) {
      setExpenses(data);
    }
  }, [data, isError, isLoading]);

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

  const handleFiltered = useCallback(
    (filteredExpenses: Expense[]) => setExpenses(filteredExpenses),
    [],
  );

  const handleReset = useCallback(
    (reset: boolean) => {
      if (reset && !isLoading && !isError) {
        setExpenses(data);
      }
    },
    [data, isError, isLoading],
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
