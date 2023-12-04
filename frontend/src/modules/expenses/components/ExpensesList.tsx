import { useCallback, useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Stack, IconButton, List, ListItem, ListItemText, Typography, Grid } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { Expense } from '../interfaces';
import { chartBackgroundColor } from '../constants';
import { mapCategories } from '../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseListProps {
  expenses: Expense[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const ExpensesList = ({ expenses, onEdit, onDelete }: ExpenseListProps) => {
  const handleEdit = useCallback((id: number) => () => onEdit && onEdit(id), [onEdit]);
  const handleDelete = useCallback((id: number) => () => onDelete && onDelete(id), [onDelete]);

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
    <div>
      <Typography variant="h2">Список витрат за обраний період</Typography>
      <Typography variant="subtitle2" color="text.secondary" mb={4}>
        За змовчуванням показано валюта "UAH" та поточний місяць. Скористуйтесь фільтром, щоб
        отримати інші дані.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Doughnut data={dataChart} options={{ responsive: true }} />
        </Grid>

        <Grid item xs={12} md={6}>
          {expenses.length > 0 ? (
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
          ) : (
            <Typography variant="body2" color="text.secondary">
              Витрат не знайдено. Змініть фільтр або додайте видатки
            </Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
