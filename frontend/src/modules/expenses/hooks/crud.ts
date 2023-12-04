import { apiClient } from 'src/modules/app/configs/axios';
import { Token } from 'src/modules/app/types';

import { Expense } from '../interfaces';

const endpoint = '/expense/expenses';

// Create an expense
export const createExpense = async (expenseData: Expense, token: Token) => {
  try {
    const response = await apiClient.post(endpoint, expenseData, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Edit an expense
export const updateExpense = async ({ id, ...expenseData }: Expense, token: Token) => {
  try {
    const response = await apiClient.put(`${endpoint}/${id}`, expenseData, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch all expenses
export const fetchExpenses = async (token: Token) => {
  try {
    const response = await apiClient.get(endpoint, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch a single expense by id
export const fetchOneExpense = async (id: number, token: Token) => {
  try {
    const response = await apiClient.get(`${endpoint}/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete an expense
export const deleteExpense = async (id: number, token: Token) => {
  try {
    const response = await apiClient.delete(`${endpoint}/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
