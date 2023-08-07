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
	callbacks: {
		// session: async ({ session, token }) => {
		// 	if (session?.user) {
		// 		// session.user.id = token.uid;
		// 	}
		// 	return session;
		// },
		// jwt: async ({ user, token }) => {
		// 	if (user) {
		// 		token.uid = user.id;
		// 	}
		// 	return token;
		// },
		async jwt({ token, user }: any) {
			if (user) {
				// token.id = user.id;
				console.log("tt", token);
			}

			return token;
		},
		async session({ session, token }: any) {
			const sess = {
				...session,
				user: {
					...session.user,
					id: token.id as string,
					role: token.role as string,
				},
			};
			console.log("seeeeeeeeess", sess);
			return sess;
		},
	},
	session: {
		// Choose how you want to save the user session.
		// The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
		// If you use an `adapter` however, we default it to `"database"` instead.
		// You can still force a JWT session by explicitly defining `"jwt"`.
		// When using `"database"`, the session cookie will only contain a `sessionToken` value,
		// which is used to look up the session in the database.
		strategy: "database",

		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60, // 24 hours

		// The session token is usually either a random UUID or string, however if you
		// need a more customized session token string, you can define your own generate function.
		generateSessionToken: () => {
			return crypto.randomUUID.toString();
		},
	},
};
// export const authOptions = {
// 	// Configure one or more authentication providers
// 	providers: [
// 		NaverProvider({
// 			clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || "",
// 			clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || "",
// 		}),
// 		GithubProvider({
// 			clientId: process.env.GITHUB_ID ?? "",
// 			clientSecret: process.env.GITHUB_SECRET ?? "",
// 		}),
// 	],
// 	adapter: PrismaAdapter(prisma),
// 	pages: {
// 		signIn: "/auth/signin",
// 	},
// 	callbacks: {
// 		session: async ({ session, token }: any) => {
// 			if (session?.user) {
// 				// session.user.id = token.uid;
// 				console.log("ttttttt", token);
// 			}
// 			return session;
// 		},
// 		jwt: async ({ user, token }: any) => {
// 			if (user) {
// 				// token.uid = user.id;
// 				console.log(token, "ddddd");
// 			}
// 			return token;
// 		},
// 	},
// 	session: {
// 		strategy: "jwt",
// 	},
// };

// const handler = NextAuth(authOptions);
const handler = NextAuth({
	jwt: {
		// The maximum age of the NextAuth.js issued JWT in seconds.
		// Defaults to `session.maxAge`.
		maxAge: 60 * 60 * 24 * 30,
		// You can define your own encode/decode functions for signing and encryption
		// async encode() {},
		// async decode() {},
	},
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
	callbacks: {
		// session: async ({ session, token }) => {
		// 	if (session?.user) {
		// 		// session.user.id = token.uid;
		// 	}
		// 	return session;
		// },
		// jwt: async ({ user, token }) => {
		// 	if (user) {
		// 		token.uid = user.id;
		// 	}
		// 	return token;
		// },
		async jwt({ token, user }) {
			if (user) {
				// token.id = user.id;
				// console.log("tt", token);
			}

			return token;
		},
		async session({ session, token }) {
			console.log("ttttttttttt", token);

			const sess = {
				...session,
				user: {
					...session.user,
					// id: token.id as string,
				},
			};
			console.log("seeeeeeeeess", sess);
			return sess;
		},
	},
	session: {
		// Choose how you want to save the user session.
		// The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
		// If you use an `adapter` however, we default it to `"database"` instead.
		// You can still force a JWT session by explicitly defining `"jwt"`.
		// When using `"database"`, the session cookie will only contain a `sessionToken` value,
		// which is used to look up the session in the database.
		strategy: "database",

		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 30 * 24 * 60 * 60, // 30 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60, // 24 hours

		// The session token is usually either a random UUID or string, however if you
		// need a more customized session token string, you can define your own generate function.
		generateSessionToken: () => {
			return crypto.randomUUID.toString();
		},
	},
});
export { handler as GET, handler as POST };
