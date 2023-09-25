import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { useRouter } from 'next/router';
import { wrapper } from '@/store/store';
import { Header } from '@/components/molecules/Header/Header';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const showHeader = router.pathname !== '/auth';

  return (
    <MantineProvider theme="light">
      <Head>
        <title>Challenge</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
        {showHeader && <Header />}
        <Component {...pageProps} />
    </MantineProvider>
  );
}

export default wrapper.withRedux(App);
