import { JWT } from "next-auth/jwt";
import NextAuth, { type DefaultSession, type User as DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      username: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    roleId: string;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username: string;
    role: string;
  }
}
