import SearchForm from "@/components/search/SearchForm";
import styles from "./styles.module.scss";
import SearchRecommendation from "@/components/search/SearchRecommendation";
import SearchResultSection from "@/components/search/SearchResultSection";

// props { params: {}, searchParams: { query: '검색' } }
export default function Page({ searchParams: { query } }: { searchParams: { query: string } }) {
	// console.log("search page props", query); // server comp라서 vs console에 찍힘
	const { main, mobileSearch } = styles;

	return (
		<main className={main}>
			{/* 모바일 */}
			<section className={mobileSearch}>
				<SearchForm />
				<SearchRecommendation isRecent={true} />
				<SearchRecommendation isRecent={false} />
			</section>

			<SearchResultSection searchParam={query} />
		</main>
	);
}
