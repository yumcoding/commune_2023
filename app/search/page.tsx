import SearchForm from "@/components/search/SearchForm";
import styles from "./styles.module.scss";
import SearchSection from "@/components/search/SearchSection";

export default function Search() {
	const { mobileSearch } = styles;

	return (
		<>
			<div className={mobileSearch}>
				<SearchForm />
				<SearchSection isRecent={true} title="최근 검색어" />
				<SearchSection isRecent={false} title="인기 검색어" />
			</div>
		</>
	);
}
