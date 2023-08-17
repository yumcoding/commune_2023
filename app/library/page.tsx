import Nav from "@/components/library/Nav";
import styles from "./styles.module.scss";
import BookSwiper from "@/components/common/BookSwiper";
import { NoListItemIcon } from "@/assets/icons";
import UserInfoSection from "@/components/library/UserInfoSection";

export default function Page() {
	const { main, reviewSection, noItem } = styles;

	return (
		<main className={main}>
			<Nav />

			<UserInfoSection />

			<section className={reviewSection}>
				<h1>
					작성한 리뷰 <small>(527)</small>
				</h1>
				{/* 작성한 책 리뷰 없을 때  */}
				<div className={noItem}>
					<NoListItemIcon />
					<p>아직 작성한 리뷰가 없어요.</p>
				</div>
				{/* 작성한 책 리뷰 있을 때  */}
				{/* <BookSwiper hasShowMore={true} /> */}
			</section>
		</main>
	);
}
