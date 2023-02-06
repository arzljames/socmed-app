import "../styles/globals.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserDataProvider } from "../context/user.context";
import Layout from "../components/Layout";
TimeAgo.addLocale(en);

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <UserDataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserDataProvider>
    </SessionProvider>
  );
};

export default MyApp;
