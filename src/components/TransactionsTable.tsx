import { IconButton } from '@chakra-ui/button';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/layout';
import { HStack } from '@chakra-ui/react';
import { Table, TableCaption, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/table';
import { Tooltip } from '@chakra-ui/tooltip';

import { useTransactions } from '../contexts/TransactionsContext';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

export function TransactionsTable() {
  const { transactions, deleteTransaction, openEditableTransaction } = useTransactions();

  return (
    <Box mt="2.5rem" border="1px" borderColor="gray.200" borderRadius="md" shadow="xl">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Título</Th>
            <Th>Valor</Th>
            <Th>Categoria</Th>
            <Th>Data</Th>
            <Th isNumeric>Ações</Th>
          </Tr>
        </Thead>

        {transactions && transactions.length > 0 ? (
          <Tbody>
            {transactions.map((transaction) => (
              <Tr key={transaction.id}>
                <Td>{transaction.title}</Td>
                <Td
                  color={transaction.type === 'deposit' ? 'green' : 'red'}
                  className={transaction.type}
                >
                  {formatCurrency(transaction.amount)}
                </Td>
                <Td>{transaction.category}</Td>
                <Td>{formatDate(new Date(transaction.createdAt))}</Td>
                <Td>
                  <HStack spacing={2} justify="end">
                    <Tooltip label="Editar transação" hasArrow>
                      <IconButton
                        onClick={() => openEditableTransaction(transaction.id)}
                        colorScheme="blue"
                        size="xs"
                        aria-label="Editar transação"
                        borderRadius="full"
                        icon={<EditIcon />}
                      />
                    </Tooltip>

                    <Tooltip label="Deletar transação" hasArrow>
                      <IconButton
                        onClick={() => deleteTransaction(transaction.id)}
                        colorScheme="red"
                        size="xs"
                        aria-label="Deletar transação"
                        borderRadius="full"
                        icon={<CloseIcon />}
                      />
                    </Tooltip>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        ) : (
          <TableCaption>Insira uma transação</TableCaption>
        )}
      </Table>
    </Box>
  );
}
