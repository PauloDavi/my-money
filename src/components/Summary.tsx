import { Flex } from '@chakra-ui/layout';

import { useTransactions } from '../contexts/TransactionsContext';
import { SummaryCard } from './SummaryCard';

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws -= transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <Flex maxW="1120px" mx="auto" justify="space-between" gap="2rem" mt="-5rem">
      <SummaryCard value={summary.deposits} color="green" title="Entradas" icon="/income.svg" />

      <SummaryCard value={summary.withdraws} color="red" title="Saídas" icon="/outcome.svg" />

      <SummaryCard
        value={summary.total}
        background={summary.total >= 0 ? 'green' : 'red'}
        color="white"
        title="Total"
        icon="/total.svg"
      />
    </Flex>
  );
}
