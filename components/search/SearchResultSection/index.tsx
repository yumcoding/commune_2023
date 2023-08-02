"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchResult from "../SearchResult";
import styles from "./styles.module.scss";
import Pagination from "@/components/common/Pagination";
import { cls } from "@/lib/front/cls";

export default function SearchResultSection() {
	const { wrapper, hidden, searchHeader } = styles;

	const searchParams = useSearchParams();

	const search = searchParams.get("query");
	const pageIndex = Number(searchParams.get("pageIndex"));

	

	const isResultHidden = search || search?.length === 0;

	// const [pageIndex, setPageIndex] = useState(0);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pageIndex]);

	return (
		<section className={isResultHidden ? cls(wrapper, hidden) : wrapper}>
			<header className={searchHeader}>
				<div>&quot;{search ?? ""}&quot;의 검색 결과</div>
			</header>
			<SearchResult query={search ?? ""} pageIndex={pageIndex} />
			<div style={{ display: "none" }}>
				<SearchResult query={search ?? ""} pageIndex={pageIndex + 1} />
			</div>
			<Pagination query={search ?? ""} pageIndex={pageIndex}  />
		</section>
	);
}
