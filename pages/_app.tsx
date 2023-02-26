import "../styles/globals.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserDataProvider } from "../context/user.context";
import Layout from "../components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
TimeAgo.addLocale(en);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <UserDataProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserDataProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
