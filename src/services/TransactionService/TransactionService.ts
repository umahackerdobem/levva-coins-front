import { AxiosError } from "axios";

import Api from "../../clients/api/Api";

import { RequestError } from "../../domain/request";
import {
  NewTransactionParams,
  TransactionValues,
} from "../../domain/transaction";

const createTransaction = async ({
  description,
  value,
  type,
  categoryId,
}: NewTransactionParams): Promise<TransactionValues> => {
  return Api.post({
    url: "/transaction",
    body: {
      description,
      value,
      type,
      categoryId,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

const getTransactions = async (): Promise<TransactionValues[]> => {
  return Api.get({
    url: "/transaction",
  })
    .then((response) => {
      //const transactions = response.data;

      //transactions.sort((a: any, b: any) => b.id.localeCompare(a.id));

      //return transactions;

      return response.data
    })
    .catch((err: AxiosError<RequestError>) => {
      throw err.response?.data;
    });
};

const searchTransactions = async (searchValue: string | null): Promise<TransactionValues[]> => {
  if (searchValue === null || searchValue?.length <= 0) return getTransactions();
    return Api.get({

        url: "/transaction/search",
        config: {
            params: {
                search: searchValue
            }
        }
    })

        .then(response => response.data)

        .catch((error: AxiosError<RequestError>) => {

            throw error.response?.data;

        });
}

export const TransactionService = {
  createTransaction,
  getTransactions,
  searchTransactions
};