import express, { Request as ExpressRequest, Response } from 'express';

import pool from '../config/db';
import verifyToken from '../middleware';

const router = express.Router();

interface Request extends ExpressRequest {
  userId?: number;
}

// Endpoint to create an expense
router.post('/expenses', verifyToken, async (req: Request, res: Response) => {
  const { category, amount, currency, date } = req.body;

  try {
    await pool.query(
      'INSERT INTO expenses(user_id, category, amount, currency, date) VALUES($1, $2, $3, $4, $5)',
      [req.userId, category, amount, currency, date]
    );
    res.status(201).json({ message: 'Expense created successfully' });
  } catch (error) {
    console.error('Error creating expense', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get all expenses for the authenticated user
router.get('/expenses', verifyToken, async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM expenses WHERE user_id = $1', [req.userId]);
    const expenses = result.rows;
    res.status(200).json({ data: expenses });
  } catch (error) {
    console.error('Error fetching expenses', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to get a single expense by id
router.get('/expenses/:id', verifyToken, async (req: Request, res: Response) => {
  const expenseId = req.params.id;

  try {
    const result = await pool.query('SELECT * FROM expenses WHERE id = $1 AND user_id = $2', [expenseId, req.userId]);
    const expense = result.rows[0];

    if (expense) {
      res.status(200).json({ data: expense });
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    console.error('Error fetching expense', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Endpoint to update an expense
router.put('/expenses/:id', verifyToken, async (req: Request, res: Response) => {
  const expenseId = req.params.id;
  const { category, amount, currency, date } = req.body;

  try {
    const result = await pool.query(
      'UPDATE expenses SET category = $1, amount = $2, currency = $3, date = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 AND user_id = $6 RETURNING *',
      [category, amount, currency, date, expenseId, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating expense', error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to delete an expense
router.delete('/expenses/:id', verifyToken, async (req: Request, res: Response) => {
  const expenseId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM expenses WHERE id = $1 AND user_id = $2 RETURNING *', [expenseId, req.userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense', error);
    res.status(500).send('Internal Server Error');
  }
});


export default router;
