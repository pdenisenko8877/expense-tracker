import { Expense } from '../interfaces';
import { categoryOptions } from '../constants';

export const filterByDate = (
  expenses: Expense[] | Expense,
  startDate?: Date,
  endDate?: Date,
): Expense[] | boolean => {
  if (Array.isArray(expenses)) {
    const filterDate = (date: Date): boolean => {
      return (!startDate || (date && date >= startDate)) && (!endDate || (date && date <= endDate));
    };

    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return filterDate(expenseDate);
    });
  }

  const expenseDate = new Date(expenses.date);
  return (!startDate || expenseDate >= startDate) && (!endDate || expenseDate <= endDate);
};

export const filterByCategory = (
  expenses: Expense[] | Expense,
  selectedCategory?: string,
): Expense[] | boolean => {
  if (Array.isArray(expenses)) {
    return expenses.filter(expense => !selectedCategory || expense.category === selectedCategory);
  }
  return !selectedCategory || expenses.category === selectedCategory;
};

export const filterByCurrency = (
  expenses: Expense[] | Expense,
  selectedCurrency?: string,
): Expense[] | boolean => {
  if (Array.isArray(expenses)) {
    return expenses.filter(expense => !selectedCurrency || expense.currency === selectedCurrency);
  }

  return !selectedCurrency || expenses.currency === selectedCurrency;
};

export const mapCategories = (category: string): string => {
  const mapping = categoryOptions.find(mapping => mapping.value === category);
  return mapping?.name || category;
};
