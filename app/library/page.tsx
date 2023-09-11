"use client";
import Nav from "@/components/library/Nav";
import UserInfoSection from "@/components/library/UserInfoSection";
import UserReviewSection from "@/components/library/UserReviewSection";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Page() {
	const { main } = styles;

	const { status } = useSession();

	if (status === "unauthenticated") {
		redirect("/");
	}

	if (status !== "loading" && status === "authenticated") {
		return (
			<main className={main}>
				<Nav />

				<UserInfoSection />

				<UserReviewSection />
			</main>
		);
	}
}
