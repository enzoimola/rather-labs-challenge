import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { ApolloProvider } from '@apollo/client';
import { Notifications } from '@mantine/notifications';
import { wrapper } from '@/store/store';
import { AuthProvider, ProtectRoute } from '@/context/auth';
import { ErrorBoundary } from '@/components/atoms/ErrorBoundary/ErrorBoundary';
import { createApolloClient } from '@/apollo-client';
import '@mantine/notifications/styles.css';

const App = ({ Component, pageProps }: AppProps) => (
      <ErrorBoundary>
          <MantineProvider>
              <Notifications position="top-right" />

              <Head>
                  <title>RLabs Media</title>
                  <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                  />
                  <link rel="shortcut icon" href="/favicon.svg" />
              </Head>

              <AuthProvider>
                  <ProtectRoute>
                      <ApolloProvider client={createApolloClient}>
                          <Component {...pageProps} />
                      </ApolloProvider>
                  </ProtectRoute>
              </AuthProvider>

          </MantineProvider>
      </ErrorBoundary>
  );

export default wrapper.withRedux(App);
