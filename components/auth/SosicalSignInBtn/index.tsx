"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

type ProvidersType = {
	providers: Record<string, ClientSafeProvider>;
};

export default function SocialSignInBtn({ providers }: ProvidersType) {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "";
	return (
		<ul>
			{Object.values(providers).map((provider, i) => (
				<li key={i}>
					<button type="button" onClick={() => signIn(provider.id, { callbackUrl })}>
						{provider.name}로 로그인하기
					</button>
				</li>
			))}
		</ul>
	);
}
