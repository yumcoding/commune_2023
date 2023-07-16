import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
// import prisma from "@/lib/server/prisma";

const prisma = new PrismaClient();

export const authOptions = {
	// Configure one or more authentication providers
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
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
