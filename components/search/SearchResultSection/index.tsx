"use client";
import { useContext, useState } from "react";
import { SearchQueryContext } from "@/providers/searchQueryProvider";
import SearchResult from "../SearchResult";
import styles from "./styles.module.scss";
import Pagination from "@/components/common/Pagination";

export default function SearchResultSection() {
	const { wrapper, searchHeader } = styles;

	const { query } = useContext(SearchQueryContext);

	const [pageIndex, setPageIndex] = useState(0);

	return (
		<section className={wrapper}>
			<header className={searchHeader}>
				<div>&quot;{query}&quot;의 검색 결과</div>
			</header>
			<SearchResult query={query ?? ""} pageIndex={pageIndex} />
			<div style={{ display: "none" }}>
				<SearchResult query={query ?? ""} pageIndex={pageIndex + 1} />
			</div>
			<Pagination query={query ?? ""} pageIndex={pageIndex} setPageIndex={setPageIndex} />
		</section>
	);
}
