"use client";
import useSWRInfinite from "swr/infinite";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchQueryContext } from "@/providers/searchQueryProvider";
import { searchFetcher } from "@/lib/front/fetchers";
import { NoResultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import SearchResultList from "../SearchResultList";
import { useSearchParams } from "next/navigation";

export interface ItemTypes {
	title: string;
	link: string;
	image: string;
	author: string;
	discount: string;
	publisher: string;
	pubdate: string;
	isbn: string;
	description: string;
}

export interface SearchResultTypes {
	lastBuildDate: string;
	total: number;
	start: number;
	display: number;
	items: ItemTypes[];
}

const PAGE_SIZE = 10;

export default function SearchResultSection() {
	const { wrapper, searchHeader, noResult, testTarget } = styles;

	const { query, setQuery } = useContext(SearchQueryContext);

	const searchParams = useSearchParams();

	const search = searchParams.get("query");

	useEffect(() => {
		if (search && search?.length > 0) {
			setQuery(search);
		}
	}, []);

	// infinite scroll

	const observeTarget = useRef<HTMLDivElement>(null);

	const getKey = (index: number) => {
		if (!query || query?.length === 0 || index >= 100) return null;
		return `/openapi/v1/search/book.json?query=${query}&display=${PAGE_SIZE}&start=${PAGE_SIZE * index + 1}`;
	};

	const { data, size, setSize, error, isValidating, isLoading } = useSWRInfinite<SearchResultTypes>(getKey, searchFetcher);

	const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const isEmpty = data?.[0]?.items?.length === 0;
	const isReachingEnd = isEmpty || (data && data?.[data.length - 1]?.items?.length < PAGE_SIZE);

	useEffect(() => {
		if (!observeTarget.current || isReachingEnd || isValidating || isLoadingMore) return;

		const io = new IntersectionObserver(
			(entries, observer) => {
				if (entries[0].isIntersecting) {
					setSize((prev) => prev + 1);
					observer.unobserve(entries[0].target);
				}
			},
			{
				root: null,
				threshold: 1,
			}
		);
		io.observe(observeTarget.current);

		return () => io.disconnect();
	}, [setSize, data, isReachingEnd, isValidating, isLoadingMore]);

	const resultList = data ? data.map((list) => list.items).flat() : [];

	return (
		<section className={wrapper}>
			<header className={searchHeader}>
				<div>&quot;{query}&quot;의 검색 결과</div>
			</header>

			{/* 기존 것 더해서 뿌려주기 */}
			<div>{resultList && <SearchResultList items={resultList} />}</div>
			<div ref={observeTarget} className={testTarget} />

			{isLoadingMore && <div>로딩중...</div>}
			{isReachingEnd && <p>검색완료</p>}
			{!resultList && (
				<div className={noResult}>
					<NoResultIcon />
					<p>
						검색 결과가 없어요. <br /> 다른 검색어를 입력해보세요.
					</p>
				</div>
			)}
		</section>
	);
}
