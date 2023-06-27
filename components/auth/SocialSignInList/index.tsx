"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { GithubIcon, NaverIcon } from "@/assets/icons";
import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";

export default function SocialSignInList() {
	const { item, naver, github } = styles;

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "";

	return (
		<ul>
			<li key="naver" className={cls(item, naver)}>
				<button type="button" onClick={() => signIn("naver", { callbackUrl })}>
					<NaverIcon />
					네이버로 로그인하기
				</button>
			</li>

			<li key="github" className={cls(item, github)}>
				<button type="button" onClick={() => signIn("github", { callbackUrl })}>
					<GithubIcon />
					Github으로 로그인하기
				</button>
			</li>
		</ul>
	);
}
