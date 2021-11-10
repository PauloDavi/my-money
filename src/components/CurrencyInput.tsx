/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { useCurrency } from 'react-hook-currency';
import { Controller, ControllerProps } from 'react-hook-form';

export interface CurrencyInputProps extends Omit<ControllerProps, 'render'> {
  placeholder?: string;
}

export function CurrencyInput({ placeholder, ...props }: CurrencyInputProps) {
  const { onClick, onChange, onKeyDown, format, toNumber } = useCurrency();

  return (
    <Controller
      {...props}
      render={({ field: { onChange: RHFOnChange, value, ...field }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error}>
          <FormLabel htmlFor={props.name}>{placeholder}</FormLabel>
          <Input
            id={props.name}
            onChange={(e) => {
              onChange(e);
              RHFOnChange(toNumber(e.target.value));
            }}
            onKeyDown={onKeyDown}
            onClick={onClick}
            size="lg"
            placeholder={placeholder}
            value={format(String(value))}
            {...field}
          />
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
}
