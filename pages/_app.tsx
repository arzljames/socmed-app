import "../styles/globals.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { UserDataProvider } from "../context/user.context";
import { PostDataProvider } from "../context/post.context";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(en);

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserDataProvider>
        <PostDataProvider>
          <Component {...pageProps} />
        </PostDataProvider>
      </UserDataProvider>
    </SessionProvider>
  );
}

export default MyApp;
