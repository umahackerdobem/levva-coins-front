import { TransactionService } from "../../services/TransactionService/TransactionService";

import {
  loadTransaction,
  loadCreateTransactionDone,
  loadTransactionFail,
} from "../../stores/TransactionStore/TransactionEvents";

import { NewTransactionParams } from "../../domain/transaction";
import { RequestError } from "../../domain/request";

const execute = async ({
  description,
  value,
  type,
  categoryId,
}: NewTransactionParams): Promise<void> => {
    
  loadTransaction();

  return TransactionService.createTransaction({
    description,
    value,
    type,
    categoryId,
  })
    .then((transaction) => {
      loadCreateTransactionDone(transaction);
    })
    .catch(({hasError, message}:RequestError)=>{
      loadTransactionFail({ hasError, message });
        throw new Error();
    });
};

const NewTransactionUseCase = {
  execute,
};

export default NewTransactionUseCase;