import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth';
import expenseRoutes from './routes/expense';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;
const corsOptions = {
  origin: process.env.FRONT
};

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use('/auth', authRoutes);
app.use('/expense', expenseRoutes);

app.get('/', (req, res) => {
  res.send(
    `Api server! Run on ${process.env.HOST} used ${port} port`,
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});