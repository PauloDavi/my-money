import { Button } from '@chakra-ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Stack } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import dynamic from 'next/dynamic'
import { Radio, RadioGroup } from '@chakra-ui/radio';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useModal } from '../contexts/ModalContext';
import { TransactionInput, useTransactions } from '../contexts/TransactionsContext';
import { CurrencyInputProps } from './CurrencyInput';

const CurrencyInput = dynamic<CurrencyInputProps>(() =>
  import('./CurrencyInput').then((mod) => mod.CurrencyInput),
  {ssr: false}
)

const defaultValues = {
  amount: 0,
  category: '',
  title: '',
  type: 'deposit',
}

export function NewTransactionModal() {
  const { isOpen } = useModal();
  const { transactionsOpenEditable, createTransaction, editTransaction, cLoseModalAndUnsetEditTransaction } = useTransactions();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange"
  });

  useEffect(() => {
    if(transactionsOpenEditable) {
      reset({
        amount: transactionsOpenEditable.amount,
        category: transactionsOpenEditable.category,
        title: transactionsOpenEditable.title,
        type: transactionsOpenEditable.type,
      })
    } else {
      reset(defaultValues)
    }
  }, [transactionsOpenEditable, reset, defaultValues])

  const onSubmit = handleSubmit((data: TransactionInput) => {
    if (transactionsOpenEditable) {
      editTransaction(transactionsOpenEditable.id, data);
    } else {
      createTransaction(data);
    }

    cLoseModalAndUnsetEditTransaction();
  });

  return (
    <Modal isOpen={isOpen} onClose={cLoseModalAndUnsetEditTransaction}>
      <ModalOverlay />
      <ModalContent mx="2rem">
        <ModalHeader>{transactionsOpenEditable ? "Editar" : "Cadastrar"} transação</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={onSubmit}>
          <ModalBody
            display="flex"
            flexDir="column"
            gridGap="1rem"
            w="full"
            maxW="576px"
            p="1rem 2rem 2rem"
          >
            <Controller
              control={control}
              name="title"
              rules={{
                required: 'O titulo é obrigatorio',
                minLength: { value: 4, message: 'O titulo deve ter no minimo 4 caracteres' },
              }}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.title}>
                  <FormLabel htmlFor="title">Título</FormLabel>
                  <Input id="title" size="lg" placeholder="Título" {...field} />
                  <FormErrorMessage>{errors.title && errors.title.message}</FormErrorMessage>
                </FormControl>
              )}
            />

            <CurrencyInput
              control={control}
              name="amount"
              placeholder="Valor"
              rules={{
                required: 'O valor é obrigatorio',
                min: {
                  message: 'O valor deve ser maior que R$ 0,01',
                  value: 0.01,
                },
              }}
            />

            <Controller
              control={control}
              name="type"
              rules={{
                required: 'O tipo é obrigatorio',
              }}
              render={({ field: { onChange, ...field } }) => (
                <FormControl isInvalid={!!errors.type}>
                  <FormLabel htmlFor="type">Tipo</FormLabel>
                  <RadioGroup {...field} onChange={(value) => onChange(value)}>
                    <Stack justifyContent="space-between" gridGap="1rem" direction="row">
                      <Radio size="lg" colorScheme="green" value="deposit">
                        Deposito
                      </Radio>

                      <Radio size="lg" colorScheme="red" value="withdraw">
                        Retirada
                      </Radio>
                    </Stack>
                  </RadioGroup>
                  <FormErrorMessage>{errors.type && errors.type.message}</FormErrorMessage>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name="category"
              rules={{
                required: 'A categoria é obrigatoria',
              }}
              render={({ field }) => (
                <FormControl isInvalid={!!errors.category}>
                  <FormLabel htmlFor="category">Categoria</FormLabel>
                  <Input id="category" size="lg" placeholder="Category" {...field} />
                  <FormErrorMessage>{errors.category && errors.category.message}</FormErrorMessage>
                </FormControl>
              )}
            />

            <ModalFooter
              p="0"
              mt="1rem"
              display="flex"
              justifyContent="space-between"
              gridGap="1rem"
            >
              <Button size="lg" colorScheme="blackAlpha" onClick={cLoseModalAndUnsetEditTransaction}>
                Fechar
              </Button>

              <Button size="lg" colorScheme="blue" type="submit" disabled={!isValid} isLoading={isSubmitting}>
                {transactionsOpenEditable ? "Editar" : "Cadastrar"}
              </Button>
            </ModalFooter>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
}
