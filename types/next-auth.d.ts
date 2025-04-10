// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { JWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string;
    };
    token: JWT & {
      accessToken: string;
    };
  }
  interface User {
    access_token: string;
  }
}
