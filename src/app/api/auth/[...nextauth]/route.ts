import NextAuth, { User, Session as NextAuthSession } from "next-auth";
import type { JWT } from "next-auth/jwt";

type Session = NextAuthSession & {
  user?: NextAuthSession["user"] & {
    role?: string;
    accessToken?: string;
    refreshToken?: string;
  };
};
import CredentialsProvider from "next-auth/providers/credentials";

// ใช้ URL API จาก environment variable (API_BASE_URL)
const API_URL = process.env.API_BASE_URL;

interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
    fullName: string;
    role: "ADMIN" | "STAFF" | "EXECUTIVE" | "DOCTOR";
    hospital?: string;
    phoneNumber?: string;
    address?: string;
    subdistrict?: string;
    district?: string;
    province?: string;
    workplace?: string;
    position?: string;
    status?: string;
    lastLogin?: string;
    refreshToken?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  accessToken: string;
  refreshToken: string;
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) return null;
        const res = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
        });
        const data: LoginResponse = await res.json();
        if (res.ok && data.accessToken) {
          return {
            ...data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          } as User;
        }
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = (user as User & { accessToken?: string }).accessToken;
        token.refreshToken = (user as User & { refreshToken?: string }).refreshToken;
        token.role = (user as User & { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = {
        ...session.user,
        role: token.role as string | undefined,
        accessToken: token.accessToken as string | undefined,
        refreshToken: token.refreshToken as string | undefined,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
