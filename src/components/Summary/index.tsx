import { useStore } from "effector-react";
import TransactionStore from "../../stores/TransactionStore/TransactionStore";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";
import { SummaryContainer, SummaryCard } from "./style";
import { defaultTheme } from "../../styles/defaultTheme";

export function Summary() {
  const { transactions } = useStore(TransactionStore);
  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type == 0){
      acc.deposits += transaction.value;
      acc.total += transaction.value;
    } else {
        acc.withdraws += transaction.value;
        acc.total -= transaction.value;
    }
    return acc;
  },
  {
    deposits: 0,
    withdraws: 0,
    total: 0
  });

  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color={defaultTheme["green-500"]} />
        </header>
        <strong>{money.format(summary.deposits)}</strong>
      </SummaryCard>
      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color={defaultTheme["red-500"]} />
        </header>
        <strong>{money.format(summary.withdraws)}</strong>
      </SummaryCard>
      <SummaryCard variant="balance">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color={defaultTheme["yellow-500"]} />
        </header>
        <strong>{money.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
