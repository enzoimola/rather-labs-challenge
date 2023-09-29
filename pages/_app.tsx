import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import { Notifications } from '@mantine/notifications';
import { wrapper } from '@/store/store';
import { Header } from '@/components/molecules/Header/Header';
import { AuthProvider } from '@/context/auth';
import { ErrorBoundary } from '@/components/atoms/ErrorBoundary/ErrorBoundary';
import { createApolloClient } from '@/apollo-client';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const showHeader = !router.pathname.includes('auth');

  return (
      <ErrorBoundary>
          <MantineProvider theme="light">
              <Notifications position="bottom-right" />

              <Head>
                  <title>Challenge</title>
                  <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                  />
                  <link rel="shortcut icon" href="/favicon.svg" />
              </Head>

              <AuthProvider>
                  <ApolloProvider client={createApolloClient}>
                        {showHeader && <Header />}
                      <Component {...pageProps} />
                  </ApolloProvider>
              </AuthProvider>

          </MantineProvider>
      </ErrorBoundary>
  );
};

export default wrapper.withRedux(App);
