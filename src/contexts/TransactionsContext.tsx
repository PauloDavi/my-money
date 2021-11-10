import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

import { v4 as uuidV4 } from 'uuid';
import { useCookieState } from '../hooks/useCookieState';

import { useModal } from './ModalContext';

interface Transaction {
  id: string;
  title: string;
  type: string;
  amount: number;
  category: string;
  createdAt: Date;
}

export type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transactionInput: TransactionInput) => void;
  deleteTransaction: (id: string) => void;
  transactionsOpenEditable: Transaction | undefined
  openEditableTransaction: (id: string) => void;
  cLoseModalAndUnsetEditTransaction: () => void;
  closeEditableTransaction: () => void;
  editTransaction: (id: string, update: Partial<Transaction>) => void;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const { onOpen, onClose } = useModal()

  const [transactions, setTransactions] = useCookieState<Transaction[]>(
    '@my-money/transactions',
    []
  );
  const [transactionsOpenEditable, setTransactionsOpenEditable] = useState<Transaction | undefined>(undefined)

  const createTransaction = useCallback(
    (transactionInput: TransactionInput) => {
      const transaction = {
        id: uuidV4(),
        ...transactionInput,
        createdAt: new Date(),
      };

      setTransactions((old) => [...old, transaction]);
    },
    [setTransactions]
  );

  const editTransaction = useCallback(
    (id: string, update: Partial<Transaction>) => {
      setTransactions((old) => old.map(o => o.id === id ? {...o, ...update} : o));
    },
    [setTransactions]
  );

  const deleteTransaction = useCallback(
    (id: string) => {
      setTransactions((old) => old.filter((O) => O.id !== id));
    },
    [setTransactions]
  );

  const closeEditableTransaction = useCallback(
    () => {
      setTransactionsOpenEditable(undefined)
    },
    [setTransactions]
  );

  const cLoseModalAndUnsetEditTransaction = useCallback(() => {
    onClose();
    closeEditableTransaction();
  }, [onClose, closeEditableTransaction])

  const openEditableTransaction = useCallback(
    (id: string) => {
      const selectTransaction = transactions.find(o => o.id === id);

      if(selectTransaction) {
        onOpen();
        setTransactionsOpenEditable(selectTransaction);
      }
    },
    [transactions, setTransactionsOpenEditable]
  );

  return (
    <TransactionsContext.Provider value={{
      transactions,
      transactionsOpenEditable,
      cLoseModalAndUnsetEditTransaction,
      closeEditableTransaction,
      editTransaction,
      openEditableTransaction,
      createTransaction,
      deleteTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
