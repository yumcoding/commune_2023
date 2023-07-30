"use client";
import useSWRInfinite from "swr/infinite";
import { useContext, useEffect, useRef, useState } from "react";
import { SearchQueryContext } from "@/providers/searchQueryProvider";
import { searchFetcher } from "@/lib/front/fetchers";
import { NoResultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import SearchResultList from "../SearchResultList";
import useDebounce from "@/hooks/useDebounce";
import { usePathname, useSearchParams } from "next/navigation";

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

export const PAGE_SIZE = 10;

// 0번. 검색어 바꾸면 index 0 되도록
// 1번. 스크롤 위치 기억하는 것 적용한다.
// 3번. isLoading, isValidating, no result 적용한다.
// 4번. context로 query 가져오는 부분들.. 어차피 client 컴포면 그냥 useSearchParam으로 가져오는 걸로
//       물론 이때, setQuery도 같이 있는 컴포넌트면 그냥 context 그대로 사용하기로 한다.

export default function SearchResultSection({ searchParam }: { searchParam: string }) {
	const { wrapper, searchHeader, noResult, testTarget } = styles;

	const { query } = useContext(SearchQueryContext);

	// infinite scroll

	const observeTarget = useRef<HTMLDivElement>(null);

	// bug alert!!!!!!!!!!!!!!
	const getKey = (index: number) => {
		if (index >= 100) return null;

		if (!query || query?.length === 0) {
			if (!searchParam) {
				return null;
			} else if (searchParam && searchParam?.length > 0) {
				const startIndex = Number(sessionStorage.getItem("startIndex"));
				return `/openapi/v1/search/book.json?query=${searchParam}&display=${PAGE_SIZE}&start=${startIndex + PAGE_SIZE * index}`;
			}
		}
		return `/openapi/v1/search/book.json?query=${query}&display=${PAGE_SIZE}&start=${PAGE_SIZE * index + 1}`;
	};

	const { data, size, setSize, error, isValidating, isLoading, mutate } = useSWRInfinite<SearchResultTypes>(getKey, searchFetcher);
	const resultList = data ? data.map((list) => list.items).flat() : [];

	// 스크롤 아래로 내리기
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
	const stringParams = params.toString();
	const fullRoute = pathname + "?" + stringParams;

	console.log("fullRoute", fullRoute);

	const paddingFunction = useDebounce({
		cb: () => sessionStorage.setItem(fullRoute, window.scrollY.toString()),
		ms: 100,
	});

	useEffect(() => {
		const scrollHandler = function () {
			paddingFunction();
		};

		window.addEventListener("scroll", scrollHandler);

		return () => {
			window.removeEventListener("scroll", scrollHandler);
		};
	}, [paddingFunction]);

	//

	const popHandler = function () {
		sessionStorage.setItem("isBack", "true");
		console.log("poppppp");
	};

	useEffect(() => {
		window.addEventListener("popstate", popHandler);

		return () => {
			window.removeEventListener("popstate", popHandler);
		};
	});

	useEffect(() => {
		const isHistoryBack = sessionStorage.getItem("isBack") === "true" ? true : false;
		const scrollYValue = sessionStorage.getItem(fullRoute) ?? false;
		if (isHistoryBack && scrollYValue) {
			mutate().then(() => {
				window.scrollTo({ top: +scrollYValue, left: 0 });
				sessionStorage.setItem("isBack", "false");
			});
		}
	}, [fullRoute, mutate]);

	const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const isEmpty = data?.[0]?.items?.length === 0;
	const isReachingEnd = isEmpty || (data && data?.[data.length - 1]?.items?.length < PAGE_SIZE);

	useEffect(() => {
		if (!observeTarget.current || isReachingEnd || isValidating || isLoadingMore) return;

		const io = new IntersectionObserver(
			(entries, observer) => {
				if (entries[0].isIntersecting) {
					setSize((prev) => prev + 1);
					const startIndex = PAGE_SIZE * size + 1;
					sessionStorage.setItem("startIndex", startIndex + "");
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
	}, [size, setSize, data, isReachingEnd, isValidating, isLoadingMore]);

	return (
		<section className={wrapper}>
			<header className={searchHeader}>
				<div>&quot;{query}&quot;의 검색 결과</div>
			</header>

			{/* 기존 것 더해서 뿌려주기 */}
			<div>{resultList && <SearchResultList items={resultList} />}</div>
			<div ref={observeTarget} className={testTarget} />

			{/* {isLoadingMore && <div>로딩중...</div>}
			{isReachingEnd && <p>검색완료</p>}
			{!isValidating && !isLoadingMore && resultList?.length === 0 && (
				<div className={noResult}>
					<NoResultIcon />
					<p>
						검색 결과가 없어요. <br /> 다른 검색어를 입력해보세요.
					</p>
				</div>
			)} */}
		</section>
	);
}
