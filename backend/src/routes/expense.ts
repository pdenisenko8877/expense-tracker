import express, { Request as ExpressRequest, Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import pool from '../config/db';

const router = express.Router();

interface Request extends ExpressRequest {
  userId?: number
}

// Middleware to verify JWT token
const verifyToken = (req: Request, res: Response, next: Function) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET as Secret, (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.userId;
    next();
  });
};

router.post('/category', verifyToken, async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    await pool.query('INSERT INTO categories(name) VALUES($1)', [name]);
    res.status(201).json({ message: 'Category created successfully' });
  } catch (error) {
    console.error('Error creating category', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/category', verifyToken, async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    const categories = result.rows;
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories', error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/expense', verifyToken, async (req: Request, res: Response) => {
  const { category_id, description, amount } = req.body;

  try {
    await pool.query('INSERT INTO expenses(user_id, category_id, description, amount) VALUES($1, $2, $3, $4)', [
      req.userId,
      category_id,
      description,
      amount,
    ]);
    res.status(201).json({ message: 'Expense created successfully' });
  } catch (error) {
    console.error('Error creating expense', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/expense', verifyToken, async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM expenses WHERE user_id = $1', [req.userId]);
    const expenses = result.rows;
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses', error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
