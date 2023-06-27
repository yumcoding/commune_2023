import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import SocialSignInBtn from "@/components/auth/SosicalSignInBtn";

// 참고
// https://next-auth.js.org/configuration/nextjs#getserversession
export default async function SignIn() {
	const session = await getServerSession(authOptions);
	if (session) {
		return redirect("/");
	}

	const providers = await getProviders();

	if (providers) {
		return (
			<>
				<SocialSignInBtn providers={providers} />
			</>
		);
	} else {
		// TODO
		throw new Error("no providers");
	}
}
