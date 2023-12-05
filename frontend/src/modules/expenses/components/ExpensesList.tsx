import { useCallback, useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
  Stack,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { useModal } from 'src/modules/ui/modal';
import { Token } from 'src/modules/app/types';

import { Expense } from '../interfaces';
import { chartBackgroundColor } from '../constants';
import { mapCategories } from '../utils';
import { ExpensesFormEditModal } from './ExpensesFormEditModal';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseListProps {
  expenses: Expense[];
  token: Token;
  onDelete?: (id: number) => void;
}

export const ExpensesList = ({ expenses, token, onDelete }: ExpenseListProps) => {
  const [expensesId, setExpensesId] = useState<number>();
  const { openModal, open, onClose } = useModal();
  const handleDelete = useCallback((id: number) => () => onDelete && onDelete(id), [onDelete]);

  const handleEdit = useCallback(
    (id: number) => () => {
      setExpensesId(id);
      openModal();
    },
    [openModal],
  );

  const [categorySums, setCategorySums] = useState<Record<string, number>>({});

  useEffect(() => {
    const updatedCategorySums: Record<string, number> = {};

    expenses.forEach(item => {
      const { category, amount } = item;
      const parsedAmount = parseFloat(`${amount}`);
      const mappedCategory = mapCategories(category);

      if (!isNaN(parsedAmount)) {
        updatedCategorySums[mappedCategory] =
          (updatedCategorySums[mappedCategory] || 0) + parsedAmount;
      }
    });

    setCategorySums(updatedCategorySums);
  }, [expenses]);

  const dataChart = useMemo(() => {
    return {
      labels: Object.keys(categorySums),
      datasets: [
        {
          data: Object.values(categorySums),
          backgroundColor: chartBackgroundColor,
        },
      ],
    };
  }, [categorySums]);

  return (
    <>
      <Box mb={2}>
        <Typography variant="h2">Список витрат за обраний період</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          За змовчуванням показано валюта "UAH" та поточний місяць. Скористуйтесь фільтром, щоб
          отримати інші дані.
        </Typography>
      </Box>

      {expenses.length > 0 ? (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3 }}>
              <Doughnut data={dataChart} options={{ responsive: true }} />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, height: '100%', maxHeight: 570, overflow: 'auto' }}>
              <List dense>
                {expenses.map(expense => (
                  <ListItem
                    key={expense.id}
                    sx={{
                      '&:not(:last-of-type)': {
                        borderBottom: theme => `1px solid ${theme.palette.grey[300]}`,
                      },
                    }}
                    secondaryAction={
                      <Stack direction="row" spacing={0.5}>
                        <IconButton edge="end" color="info" onClick={handleEdit(expense.id!)}>
                          <EditOutlinedIcon />
                        </IconButton>
                        <IconButton edge="end" color="error" onClick={handleDelete(expense.id!)}>
                          <DeleteOutlinedIcon />
                        </IconButton>
                      </Stack>
                    }>
                    <ListItemText
                      primary={
                        <>
                          Витратили:
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            pl={1}
                            fontWeight={700}>
                            {expense.amount} {expense.currency}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                            pr={1}
                            fontWeight={500}>
                            Категорія: {mapCategories(expense.category)}
                          </Typography>
                          {`Дата: ${new Date(expense.date).toLocaleDateString()}`}
                        </>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Paper elevation={0} sx={{ p: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Витрат не знайдено. Змініть фільтр або додайте витрати
          </Typography>
        </Paper>
      )}

      {expensesId && (
        <ExpensesFormEditModal open={open} onClose={onClose} token={token} editId={expensesId} />
      )}
    </>
  );
};
