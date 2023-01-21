import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_SERVER, API_SERVER_DEV } from "../../../const";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(
        credentials: Record<string, string>,
        req
      ): Promise<any | null> {
        const res = await fetch(`${API_SERVER_DEV}/api/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],
};

export default NextAuth({
  ...authOptions,
  session: { maxAge: 1 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      token = { ...token, ...user };
      return token;
    },
    async session({ session, user, token }) {
      session.user = { ...session.user, ...token };
      return session;
    },
  },
});
