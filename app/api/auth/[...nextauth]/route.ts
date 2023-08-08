import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const authOptions = {
	providers: [
		NaverProvider({
			clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
			clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || "",
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? "",
			clientSecret: process.env.GITHUB_SECRET ?? "",
		}),
	],
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: "/auth/signin",
	},
	callbacks: {
		async session({ session, user }: any) {
			const newSession = {
				...session,
				user: {
					...user,
					id: user.id,
				},
			};
			return newSession;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
