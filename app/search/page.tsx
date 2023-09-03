import SearchForm from "@/components/search/SearchForm";
import styles from "./styles.module.scss";
import SearchRecommendation from "@/components/search/SearchRecommendation";
import SearchResultSection from "@/components/search/SearchResultSection";

export default function Page() {
	const { main, mobileSearch } = styles;

	return (
		<main className={main}>
			{/* 모바일 */}
			<section className={mobileSearch}>
				<SearchForm />
				{/* TODO : 검색어 추천 2차 DB 완성 후  */}
				{/* <SearchRecommendation isRecent={true} />
				<SearchRecommendation isRecent={false} /> */}
			</section>

			<SearchResultSection />
			
		</main>
	);
}
