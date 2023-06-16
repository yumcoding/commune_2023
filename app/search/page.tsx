import SearchForm from "@/components/search/SearchForm";
import styles from "./styles.module.scss";
import SearchRecommendation from "@/components/search/SearchRecommendation";

export default function Search() {
	const { mobileSearch } = styles;

	return (
		<>
			<div className={mobileSearch}>
				<SearchForm />
				<SearchRecommendation isRecent={true} />
				<SearchRecommendation isRecent={false} />
			</div>
			{/* tablet 이후 search 화면 */}
		</>
	);
}
