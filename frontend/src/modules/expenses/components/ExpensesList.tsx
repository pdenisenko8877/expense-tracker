import { useCallback } from 'react';
import { Stack, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import { Expense } from '../interfaces';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export const ExpensesList = ({ expenses, onEdit, onDelete }: ExpenseListProps) => {
  const handleEdit = useCallback((id: number) => () => onEdit && onEdit(id), [onEdit]);
  const handleDelete = useCallback((id: number) => () => onDelete && onDelete(id), [onDelete]);

  return (
    <div>
      <h2>Список Витрат за обраний період</h2>
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
                      Категорія: {expense.category}
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
    </div>
  );
};
