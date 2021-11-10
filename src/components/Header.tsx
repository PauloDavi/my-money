import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';

import { useModal } from '../contexts/ModalContext';

export function Header() {
  const { onOpen } = useModal();

  return (
    <Box as="header" bg="darkcyan">
      <Flex align="center" justify="space-between" maxW="1120px" mx="auto" p="2rem 1rem 6rem">
        <img src="/logo.svg" alt="dt money" />

        <Button fontSize="1rem" colorScheme="linkedin" onClick={onOpen} type="button">
          Nova Transação
        </Button>
      </Flex>
    </Box>
  );
}
