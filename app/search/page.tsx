import SearchForm from "@/components/search/SearchForm";
import styles from "./styles.module.scss";
import SearchRecommendation from "@/components/search/SearchRecommendation";

export default function Search() {
	const { mobileSearch } = styles;

	return (
		<>
			<div className={mobileSearch}>
				<SearchForm />
				<SearchRecommendation isRecent={true} title="최근 검색어" />
				<SearchRecommendation isRecent={false} title="인기 검색어" />
			</div>
		</>
	);
}
