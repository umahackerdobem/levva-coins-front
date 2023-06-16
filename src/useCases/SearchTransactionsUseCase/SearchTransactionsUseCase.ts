import { RequestError } from "../../domain/request";
import { TransactionValues } from "../../domain/transaction";
import { TransactionService } from "../../services/TransactionService/TransactionService";
import { loadTransaction, loadTransactionDone, loadTransactionFail } from "../../stores/TransactionStore/TransactionEvents";

const execute = async (searchValue: string | null) => {

    loadTransaction();

    return TransactionService.searchTransactions(searchValue)

        .then((transactions: TransactionValues[]) => {

            loadTransactionDone(transactions);

        })

        .catch(({ hasError, message }: RequestError) => {

            loadTransactionFail({ hasError, message });

        });

}




export const SearchTransactionsUseCase = {

    execute,

}