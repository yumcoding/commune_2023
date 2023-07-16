"use client";
import useSWR from "swr";
import { useContext } from "react";
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

export default function SearchResultSection() {
	const { wrapper, searchHeader, noResult } = styles;

	const { query } = useContext(SearchQueryContext);
	const { data } = useSWR<SearchResultTypes>(query && query?.length > 0 ? `/openapi/v1/search/book.json?query=${query}` : null, searchFetcher);

	return (
		<section className={wrapper}>
			<header className={searchHeader}>
				<div>&quot;{query}&quot;의 검색 결과</div>
			</header>

			{!data ? null : (
				<>
					{data.total === 0 ? (
						<div className={noResult}>
							<NoResultIcon />
							<p>
								검색 결과가 없어요. <br /> 다른 검색어를 입력해보세요.
							</p>
						</div>
					) : (
						<SearchResultList items={data.items} />
					)}
				</>
			)}
		</section>
	);
}
