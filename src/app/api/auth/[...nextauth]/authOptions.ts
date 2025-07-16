import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcryptjs";
import { PrismaClient } from "@/generated/prisma";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AuthOptions } from "next-auth";

const prisma = new PrismaClient();

type SessionUser = {
  id?: string;
  email?: string | null;
  name?: string | null;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) {
          return null;
        }
        // Compare hashed password
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          return null;
        }
        // Return only the fields NextAuth expects
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    newUser: "/auth/signup",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user = {
          ...session.user,
          id: token.id,
          email: token.email,
          name: token.name,
        } as SessionUser;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 