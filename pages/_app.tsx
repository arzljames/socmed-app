import "../styles/globals.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserDataProvider } from "../context/user.context";
import Layer from "../components/Layer";

TimeAgo.addLocale(en);

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <SessionProvider session={session}>
      <UserDataProvider>
        <Layer>
          <Component {...pageProps} />
        </Layer>
      </UserDataProvider>
    </SessionProvider>
  );
};

export default MyApp;
