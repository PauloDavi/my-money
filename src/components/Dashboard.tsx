import { Box } from '@chakra-ui/layout';

import { Summary } from './Summary';
import { TransactionsTable } from './TransactionsTable';

export function Dashboard() {
  return (
    <Box maxW="1120px" mx="auto" px="2.5rem" pt="1rem" pb="2rem">
      <Summary />

      <TransactionsTable />
    </Box>
  );
}
