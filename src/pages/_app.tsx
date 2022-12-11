import "../styles/globals.css";
import type { AppProps as NextAppProps } from "next/app";
import { NextComponentType } from "next";
import NextNProgress from "nextjs-progressbar";
import { SWRConfig } from "swr";
import React, { FC } from "react";
import { PhotoProvider } from "react-photo-view";
import DismissableToast from "../components/main/dismissableToast";
import { LoadingProvider } from "../context/loadingCtx";
import LoadingComp from "../components/main/loader";
import { fetcher } from "../lib/helperFunctions/fetcher";
import { HeaderProvider } from "../context/headerCtx";
import { UserProvider } from "../context/userCtx";
import { HistoryProvider } from "../context/historyCtx";
// import DefaultLayout from "../layouts/defaultLayout";

import { wrapper } from '../redux/store';
import RouteGuard from "../layouts/routeGuard";

type ComponentProp = NextComponentType & {
  getLayout?: () => FC<{}>;
};

type AppProps = NextAppProps & { Component: ComponentProp };

function MyApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: React.ReactNode) => page);

  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 10000,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
      }}
    >
      <LoadingProvider>
        <PhotoProvider>
          <UserProvider>
            <HistoryProvider>
              <HeaderProvider>
                <RouteGuard>
                  <DismissableToast />
                  <LoadingComp />
                  <NextNProgress
                    color="#f1f1f1"
                    height={1}
                    options={{ showSpinner: false }}
                  />
                  <>{getLayout(<Component {...pageProps} />)}</>
                </RouteGuard>
              </HeaderProvider>
            </HistoryProvider>
          </UserProvider>
        </PhotoProvider>
      </LoadingProvider>
    </SWRConfig>
  );
}

export default wrapper.withRedux(MyApp);
