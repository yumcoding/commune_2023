import Nav from "@/components/library/Nav";

import UserInfoSection from "@/components/library/UserInfoSection";
import styles from "./styles.module.scss";
import UserReviewSection from "@/components/library/UserReviewSection";

export default function Page() {
	const { main } = styles;

	return (
		<main className={main}>
			<Nav />

			<UserInfoSection />

			<UserReviewSection />
		</main>
	);
}
