import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dancing_script } from "@/app/fonts";
import { redirect } from "next/navigation";
import SocialSignInList from "@/components/auth/SocialSignInList";
import styles from "./styles.module.scss";
import { cls } from "@/lib/front/cls";

export const metadata: Metadata = {
	title: "꼬뮨 | 로그인",
};

export default async function SignIn() {
	const { wrapper, logo, desc } = styles;

	const session = await getServerSession(authOptions);
	if (session) {
		redirect("/");
	}

	return (
		<div className={wrapper}>
			<h1 className={cls(dancing_script.className, logo)}>Commune</h1>
			<p className={desc}>느슨한 취향 공동체</p>
			<SocialSignInList />
		</div>
	);
}
