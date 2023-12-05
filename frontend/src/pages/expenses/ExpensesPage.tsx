import { useState, useCallback, useEffect, useMemo } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Button, Typography } from '@mui/material';

import { useAuth } from 'src/modules/auth/hooks/useAuth';
import { Loader } from 'src/modules/ui/loader';
import { ExpensesFormModal } from 'src/modules/expenses/components/ExpensesFormModal';
import { ExpensesList } from 'src/modules/expenses/components/ExpensesList';
import { ExpensesFilterForm } from 'src/modules/expenses/components/ExpensesFilterForm';
import { Expense } from 'src/modules/expenses/interfaces';
import { filterByCurrency, filterByDate } from 'src/modules/expenses/utils';
import { fetchExpenses, deleteExpense } from 'src/modules/expenses/hooks/crud';
import { useMessages } from 'src/modules/messages/hooks/useMessages';
import { useModal } from 'src/modules/ui/modal';

export const ExpensesPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { show } = useMessages();
  const { openModal, open, onClose } = useModal();

  const [isLoading, seIsLoading] = useState<boolean>(true);

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
    <>
      <Box mb={4}>
        <Typography variant="h2" mb={1}>
          Вітаємо вас у Expense Tracker – вашим надійним помічником у керуванні витратами!
        </Typography>
        <Typography paragraph>
          Будь-який успішний шлях до фінансового благополуччя починається з ефективного ведення
          обліку ваших витрат. Expense Tracker - це зручний і простий у використанні інструмент,
          який допоможе вам здійснювати контроль над вашими витратами швидко та ефективно.
        </Typography>
        <Typography paragraph>
          Почніть прямо зараз та робіть свої фінанси більш контрольованими!
        </Typography>
        <Button onClick={openModal}>Додати витрати</Button>
      </Box>

      <Loader isLoading={isLoading}>
        <ExpensesFilterForm expenses={data} onSubmit={handleFiltered} onReset={handleReset} />

        <ExpensesList expenses={expenses} onDelete={handleDelete} token={token} />
      </Loader>

      <ExpensesFormModal open={open} onClose={onClose} token={token} />
    </>
  );
};
