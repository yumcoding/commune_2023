import type { Metadata } from "next";
import SearchForm from "@/components/search/SearchForm";
import styles from "./styles.module.scss";
import SearchRecommendation from "@/components/search/SearchRecommendation";
import SearchResultSection from "@/components/search/SearchResultSection";

export type ParamsTypes = {
	params?: { id: string },
	searchParams?: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: ParamsTypes): Promise<Metadata> {
	const title = searchParams?.query ? `꼬뮨 | ${searchParams.query} 검색결과` : "꼬뮨 | 검색";
	return {
		title,
	};
}

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
