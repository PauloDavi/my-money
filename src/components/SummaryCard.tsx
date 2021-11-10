import { Box, Flex, Text } from '@chakra-ui/layout';

import { formatCurrency } from '../utils/formatCurrency';

interface SummaryCardProps {
  value: number;
  background?: string;
  color: string;
  title: string;
  icon: string;
}

export function SummaryCard({ value, background = 'white', color, title, icon }: SummaryCardProps) {
  return (
    <Box background={background} color={color} py="1rem" px="2rem" borderRadius="md" boxShadow="xl">
      <Flex as="header" align="center" mb="1rem" justify="space-between">
        <span>{title}</span>
        <img src={icon} alt={title} />
      </Flex>

      <Text as="strong" fontSize="2rem" lineHeight="3rem">
        {formatCurrency(value)}
      </Text>
    </Box>
  );
}
