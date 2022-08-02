import ErrorBoundary from '@/components/ErrorBoundary';
import ErrorFallback from '@/components/ErrorFallback/ErrorFallback';
import Header from '@/components/Header/Header';
import { MESSAGE } from '@/constants/messages';
import apiClient from '@/libs/api/apiClient';
import { NextUIProvider } from '@nextui-org/react';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppContext, AppProps } from 'next/app';
import { useState } from 'react';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            suspense: true,
            staleTime: 1000 * 60 * 3,
          },
        },
      }),
  );

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Hydrate state={pageProps.dehydratedState}>
          <NextUIProvider>
            <ErrorBoundary
              fallback={<ErrorFallback message={MESSAGE.ERROR.UNKNOWN} />}
            >
              <Header />
              <Component {...pageProps} />
            </ErrorBoundary>
          </NextUIProvider>
        </Hydrate>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

MyApp.getInitialProps = async (context: AppContext) => {
  const { ctx, Component } = context; // next에서 넣어주는 context
  let pageProps = {};
  const cookie = ctx.req ? ctx.req.headers.cookie : '';
  apiClient.defaults.headers.common['Cookie'] = '';
  if (ctx.req && cookie) {
    apiClient.defaults.headers.common['Cookie'] = cookie;
  }

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default MyApp;
