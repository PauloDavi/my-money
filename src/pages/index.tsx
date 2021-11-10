import { Box } from '@chakra-ui/layout';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { Dashboard } from '../components/Dashboard';
import { Header } from '../components/Header';
import { NewTransactionModal } from '../components/NewTransactionModal';

const Home: NextPage = () => {
  return (
    <>
      <NextSeo
        title="My Money"
        description="Gerenciador de caixa pessoal - armazena valores no local storage"
      />

      <Header />

      <Box as="main">
        <Dashboard />

        <NewTransactionModal />
      </Box>
    </>
  );
};

export default Home;
