import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { login, signInWithGoogle } from "@/utils/db/servicefirebase";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await login(credentials.email, credentials.password);

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          role: user.role || "user",
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (user) {
        token.email = user.email;
        token.fullname = user.fullname || user.name || profile?.name;
        token.role = user.role || token.role || "user";
      }

      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: account.provider,
        };

        await signInWithGoogle(data, (result: any) => {
          // Pastikan mengecek result.status sesuai dengan object yang dikirim
          if (result.status) {
            token.fullname = result.data.fullname;
            token.email = result.data.email;
            token.image = result.data.image;
            token.type = result.data.type;
            token.role = result.data.role;
          }
        });
      }

      if (account?.provider === "google") {
        token.fullname = profile?.name || token.fullname || token.name || "";
        token.email = token.email || profile?.email || user?.email;
        token.image = profile?.picture || token.image || user?.image;
        token.role = token.role || "user";
        token.type = account.provider;
      }

      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        const userSession = session.user as typeof session.user & {
          fullname?: string;
          role?: string;
          type?: string;
        };

        if (token.email) {
          userSession.email = token.email;
        }
        if (token.fullname) {
          userSession.fullname = token.fullname;
        }

        if (token.image) {
          userSession.image = token.image;
        }

        if (token.role) {
          userSession.role = token.role;
        }

        if (token.type) {
          userSession.type = token.type;
        }
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);