import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import * as z from "zod";
import jwt from "jsonwebtoken";
import { login } from "./_lib/login";
export const {
  auth,
  signIn,
  signOut,
  handlers: { POST, GET },
} = NextAuth({
  session: {
    maxAge: 12 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.token = token;
        const userInfo = jwt.decode(token.accessToken as string);
        if (userInfo && typeof userInfo === "object") {
          session.user = { ...session.user, ...userInfo };
        }
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const token = await login({ email, password });
          if (!token) throw new Error("Invalid credentials");
          return token;
        }
        return null;
      },
    }),
  ],
});
