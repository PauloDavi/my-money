import { createContext, ReactNode, useContext } from 'react';

import { useDisclosure } from '@chakra-ui/hooks';

interface ModalContextData {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export function ModalProvider({ children }: ModalProviderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ModalContext.Provider value={{ isOpen, onOpen, onClose }}>{children}</ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
