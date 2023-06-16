import { useStore } from "effector-react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";
import { HomeWrapper, PriceHighLight, TransactionsContainer, TransactionsTable, TransactionsTableEmpty } from "./style";
import { useEffect, useState } from "react";
import GetTransactionsUseCase from "../../useCases/GetTransactionUseCases/GetTransactionUseCases";
import { TransactionValues } from "../../domain/transaction";

export function Home() {
  const { isLoading, transactions } = useStore(TransactionStore);
  const [searchTransaction, setSearchTransaction] = useState<TransactionValues[]>([]);

  const onSearchItem = (searchItem:string) => {
    const resultsFilter = transactions.filter((item) => 
    item.description.toLowerCase().includes(searchItem.toLowerCase()) ||
    item.value.toString().includes(searchItem) ||
    item.category.description.toLowerCase().includes(searchItem.toLowerCase()) ||
    item.date.toString().includes(searchItem));

    setSearchTransaction(resultsFilter)
  }
  
  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    GetTransactionsUseCase.execute();
}, []);
  return (
    <HomeWrapper>
      <Header />
      <Summary />
      <SearchForm onSearch={onSearchItem}/>

      <TransactionsContainer>
        <TransactionsTable>
          <thead>
            <tr>

            <td>Descrição</td>
            <td>Preço</td>
            <td>Categorias</td>
            <td>Data</td>

            </tr>
          </thead>

          <tbody>
            {(searchTransaction.length > 0 ? searchTransaction : transactions).map(transaction => (
            <tr key={transaction.id}>
              <td width="50%">{transaction.description}</td>
              <td>
                <PriceHighLight 
                variant={transaction.type == 0 ? "income" : "outcome"}>
                  {money.format(transaction.value)}
                  </PriceHighLight>
              </td>
              <td>{transaction.category.description}</td>
              <td>{transaction.date}</td>
            </tr>
            ))}
          </tbody>
        </TransactionsTable>
        {!isLoading && transactions.length == 0 && (
        <TransactionsTableEmpty>
          Adicione uma categoria e a sua primeira transação :)
        </TransactionsTableEmpty>
        )}
      </TransactionsContainer>
    </HomeWrapper>
  );
}
