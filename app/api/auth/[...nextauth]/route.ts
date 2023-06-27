import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import NaverProvider from "next-auth/providers/naver";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/server/prisma";

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? "",
			clientSecret: process.env.GITHUB_SECRET ?? "",
		}),
		// ...add more providers here
		// CredentialsProvider({
		// 	// The name to display on the sign in form (e.g. "Sign in with...")
		// 	name: "Credentials",
		// 	// `credentials` is used to generate a form on the sign in page.
		// 	// You can specify which fields should be submitted, by adding keys to the `credentials` object.
		// 	// e.g. domain, username, password, 2FA token, etc.
		// 	// You can pass any HTML attribute to the <input> tag through the object.
		// 	credentials: {
		// 		username: { label: "Username", type: "text", placeholder: "jsmith" },
		// 		password: { label: "Password", type: "password" },
		// 	},
		// 	async authorize(credentials, req) {
		// 		// Add logic here to look up the user from the credentials supplied
		// 		const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };

		// 		if (user) {
		// 			// Any object returned will be saved in `user` property of the JWT
		// 			return user;
		// 		} else {
		// 			// If you return null then an error will be displayed advising the user to check their details.
		// 			return null;

		// 			// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
		// 		}
		// 	},
		// }),
	],

	// link up prisma
	// next auth한테 db랑 이야기하고 싶으면 prisma 찾아가라고 말해줌
	adapter: PrismaAdapter(prisma),

	// A random string is used to hash tokens, sign/encrypt cookies and generate cryptographic keys.
	// If you set NEXTAUTH_SECRET as an environment variable, you don't have to define this option.
	// Not providing any secret or NEXTAUTH_SECRET will throw an error in production.
	secret: process.env.SECRET,

	// user info db에 실제 저장?
	session: {
		// Choose how you want to save the user session.
		// The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
		// If you use an `adapter` however, we default it to `"database"` instead.
		// You can still force a JWT session by explicitly defining `"jwt"`.
		// When using `"database"`, the session cookie will only contain a `sessionToken` value,
		// which is used to look up the session in the database.
		strategy: "jwt",
	},
	// callbacks: {
	// 	async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
	// 		// Allows relative callback URLs
	// 		// if (url.startsWith("/")) return `${baseUrl}${url}`;
	// 		// Allows callback URLs on the same origin
	// 		// else if (new URL(url).origin === baseUrl) return url;
	// 		return "/";
	// 	},
	// },
	// pages
	pages: {
		// signIn: "/login",
		// signOut: "/logOut",
	},
};

// const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);

// export { authHandler as GET, authHandler as POST };

const handler = NextAuth({
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
});
export { handler as GET, handler as POST };
