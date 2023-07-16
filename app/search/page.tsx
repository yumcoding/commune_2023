import SearchForm from "@/components/search/SearchForm";
import styles from "./styles.module.scss";
import SearchRecommendation from "@/components/search/SearchRecommendation";
import SearchResult from "@/components/search/SearchResult";

export default function Page() {
	const { main, mobileSearch, defaultSearch, queryWrapper } = styles;

	return (
		<main className={main}>
			{/* 모바일 */}
			<section className={mobileSearch}>
				<SearchForm />
				<SearchRecommendation isRecent={true} />
				<SearchRecommendation isRecent={false} />
			</section>

			{/* 태블릿 이후 */}
			<section className={defaultSearch}>
				<div className={queryWrapper}>
					<div>&quot;{}&quot;의 검색 결과</div>
				</div>
			</section>

			<SearchResult />
		</main>
	);
}
