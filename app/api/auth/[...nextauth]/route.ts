import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/server/prisma";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		NaverProvider({
			clientId: process.env.NAVER_CLIENT_ID || "",
			clientSecret: process.env.NAVER_CLIENT_SECRET || "",
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? "",
			clientSecret: process.env.GITHUB_SECRET ?? "",
		}),
	],
	pages: {
		signIn: "/auth/signin",
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
