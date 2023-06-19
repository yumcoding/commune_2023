import SearchForm from "@/components/search/SearchForm";
import styles from "./styles.module.scss";
import SearchRecommendation from "@/components/search/SearchRecommendation";
import { NoResultIcon } from "@/assets/icons";

// 검색 페이지는 완전 CSR로 구현?

export default function Page() {
	const { mobileSearch, defaultSearch, queryWrapper, searchResultWrapper, noResult, resultList } = styles;

	return (
		<>
			{/* 모바일 */}
			<section className={mobileSearch}>
				<SearchForm />
				{/* 모바일 - 검색 전 */}
				<SearchRecommendation isRecent={true} />
				<SearchRecommendation isRecent={false} />
				{/* 모바일 - 검색 후 */}
				{/* suspense 사용하여 로딩 이미지 보여주기 */}
			</section>
			{/* 태블릿 이후 */}
			<section className={defaultSearch}>
				<div className={queryWrapper}>
					<div>&quot;{}&quot;의 검색 결과</div>
				</div>

				<div className={searchResultWrapper}>
					{/* 검색 결과 없음 */}
					<div className={noResult}>
						<NoResultIcon />
						<p>
							검색 결과가 없어요. <br /> 다른 검색어를 입력해보세요.
						</p>
					</div>

					{/* 검색 결과 */}
					{/* <ul className={resultList}></ul> */}
				</div>
			</section>
		</>
	);
}
