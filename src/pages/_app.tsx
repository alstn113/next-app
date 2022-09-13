import ModalProvider from '@/components/ModalProvider';
import { setClientCookie } from '@/lib/api/apiClient';
import GlobalStyle from '@/styles/GlobalStyle';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppContext, AppProps } from 'next/app';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            refetchInterval: false,
            staleTime: 1000 * 60 * 3, // 3m
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryDevtools initialIsOpen={false} position={'top-right'} /> */}
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
          <ModalProvider />
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx, Component } = context; // next에서 넣어주는 context
  let pageProps = {};
  const cookie = ctx.req ? ctx.req.headers.cookie : '';
  setClientCookie('');
  if (ctx.req && cookie) {
    setClientCookie(cookie);
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default MyApp;
