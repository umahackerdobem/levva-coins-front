import { CategoryValues } from "../category";

export interface NewTransactionParams {
  description: string;
  value: number;
  type: number;
  categoryId: string;
}

export interface TransactionValues {
  id: string;
  description: string;
  value: number;
  type: number;
  category: CategoryValues;
 // categoryId: CategoryValues;
  date: string;
}