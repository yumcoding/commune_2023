import DBBookList from "@/components/home/DBBookList";
import styles from "./styles.module.scss";
import SearchBookList from "@/components/home/SearchBookList";
export default function Page() {
	const { main, section, sectionHeading } = styles;
	return (
		<>
			<main className={main}>
				<section className={section}>
					<h2 className={sectionHeading}>
						최근 리뷰가 작성된 책<span>✏️</span>
					</h2>
					<DBBookList />
				</section>
				<section className={section}>
					<h2 className={sectionHeading}>
						가을<span>🍂</span> 추천 시리즈 1. &#39;띵&#39;{" "}
					</h2>
					<SearchBookList query="띵 시리즈" />
				</section>
				<section className={section}>
					<h2 className={sectionHeading}>
						가을<span>🍂</span> 추천 시리즈 2. &#39;아무튼&#39;
					</h2>
					<SearchBookList query="아무튼" />
				</section>
				<section className={section}>
					<h2 className={sectionHeading}>
						가을<span>🍂</span> 추천 시리즈 3. &#39;일상이 고고학&#39;
					</h2>
					<SearchBookList query="일상이 고고학" />
				</section>
			</main>
		</>
	);
}
