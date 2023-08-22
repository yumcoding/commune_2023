import DBBookList from "@/components/home/DBBookList";
import styles from "./styles.module.scss";
import { Suspense } from "react";
import ListLoading from "@/components/home/ListLoading";
import SearchBookList from "@/components/home/SearchBookList";
export default function Page() {
	const { main, section, sectionHeading } = styles;
	return (
		<>
			<main className={main}>
				<section className={section}>
					<h2 className={sectionHeading}>리뷰가 가장 많은 책 TOP 10 👑</h2>
					<Suspense fallback={<ListLoading />}>
						<DBBookList />
					</Suspense>
				</section>
				<section className={section}>
					<h2 className={sectionHeading}>가을맞이 추천 시리즈 1. &#39;띵&#39; </h2>
					<Suspense fallback={<ListLoading />}>
						<SearchBookList query="띵 시리즈" />
					</Suspense>
				</section>
				<section className={section}>
					<h2 className={sectionHeading}>가을맞이 추천 시리즈 2. &#39;아무튼&#39;</h2>
					<Suspense fallback={<ListLoading />}>
						<SearchBookList query="아무튼" />
					</Suspense>
				</section>
				<section className={section}>
					<h2 className={sectionHeading}>가을맞이 추천 시리즈 3. &#39;일상이 고고학&#39;</h2>
					<Suspense fallback={<ListLoading />}>
						<SearchBookList query="일상이 고고학" />
					</Suspense>
				</section>
			</main>
		</>
	);
}
