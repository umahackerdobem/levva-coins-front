import { TransactionService } from "../../services/TransactionService/TransactionService";
import {
  loadTransaction,
  loadTransactionDone,
  loadTransactionFail,
} from "../../stores/TransactionStore/TransactionEvents";
import { TransactionValues } from "../../domain/transaction";
import { RequestError } from "../../domain/request";

const execute = async (): Promise<void> => {
  const errorCallback = ({ hasError, message }: RequestError) => {
    loadTransactionFail({ hasError, message });
  };

  loadTransaction();

  return TransactionService.getTransactions()
    .then((transactions: TransactionValues[]) => {
      loadTransactionDone(transactions);
    })
    .catch(errorCallback);
};

const GetTransactionsUseCase = {
  execute,
};

export default GetTransactionsUseCase;