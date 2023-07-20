"use client";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchQueryContext } from "@/providers/searchQueryProvider";
import { searchFetcher } from "@/lib/front/fetchers";
import { NoResultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import SearchResultList from "../SearchResultList";

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

	const { query } = useContext(SearchQueryContext);

	// infinite scroll
	const rootElem = useRef<HTMLDivElement>(null);

	const observeTarget = useRef<HTMLDivElement>(null);

	const [startIndex, setStartIndex] = useState(1);

	const getKey = () => {
		if (!query || query?.length === 0) return null;
		return `/openapi/v1/search/book.json?query=${query}&display=${PAGE_SIZE}&start=${startIndex}`;
	};

	const { data, size, setSize, error, isValidating, isLoading } = useSWRInfinite<SearchResultTypes>(getKey, searchFetcher);

	const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const isEmpty = data?.[0]?.items?.length === 0;
	const isReachingEnd = isEmpty || (data && data?.[data.length - 1]?.items?.length < PAGE_SIZE);

	useEffect(() => {
		if (!observeTarget.current || isReachingEnd) return;

		const io = new IntersectionObserver(
			(entries, observer) => {
				if (entries[0].isIntersecting) {
					setSize((prev) => prev + 1);
					setStartIndex((prev) => prev + 10);
					console.log("intersecting!!!!!!!");
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
	}, [setSize, data, isReachingEnd, isValidating, startIndex]);

	return (
		<section className={wrapper}>
			<header className={searchHeader}>
				<div>&quot;{query}&quot;의 검색 결과</div>
			</header>

			<div ref={rootElem}>
				{data && (
					<>
						{/* 기존 것 더해서 뿌려주기 */}
						<div>{data[data.length - 1]?.items && !isReachingEnd ? <SearchResultList items={data[data.length - 1]?.items} /> : null}</div>
						<div ref={observeTarget} className={testTarget} />
					</>
				)}
			</div>
			{isLoadingMore && <div>로딩중...</div>}
			{isReachingEnd && <p>검색완료</p>}
			{/* {!data ? null : (
				<>
					{data.total === 0 ? (
						<div className={noResult}>
							<NoResultIcon />
							<p>
								검색 결과가 없어요. <br /> 다른 검색어를 입력해보세요.
							</p>
						</div>
					) : (
						<>
							<SearchResultList items={data.items} />
							<div style={{ display: "none" }}>
								
								  </div>
						</>
					)}
				</>
			)} */}
		</section>
	);
}
