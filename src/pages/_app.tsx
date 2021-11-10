import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { ModalProvider } from '../contexts/ModalContext';
import { TransactionsProvider } from '../contexts/TransactionsContext';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icon-logo.svg" />
      </Head>

      <ChakraProvider>
        <ModalProvider>
          <TransactionsProvider>
            <CSSReset />
            <Component {...pageProps} />
          </TransactionsProvider>
        </ModalProvider>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
