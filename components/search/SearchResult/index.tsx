"use client";
import useSWR from "swr";
import { useState, useContext } from "react";
import { SearchQueryContext } from "@/providers/searchQueryProvider";
import { searchFetcher } from "@/lib/front/fetchers";
import { NoResultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { cls } from "@/lib/front/cls";
import Book from "@/components/common/Book";

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

export default function SearchResult() {
	const { wrapper, list, noResult } = styles;

	const { query } = useContext(SearchQueryContext);
	const { data, error, isLoading } = useSWR<SearchResultTypes>(query && query?.length > 0 ? `/openapi/v1/search/book.json?query=${query}` : null, searchFetcher);

	if (!data) {
		return null;
	}

	if (isLoading) {
		return <div>loading...</div>;
	}

	return (
		<section className={wrapper}>
			{data.total === 0 ? (
				<div className={noResult}>
					<NoResultIcon />
					<p>
						검색 결과가 없어요. <br /> 다른 검색어를 입력해보세요.
					</p>
				</div>
			) : (
				<ul className={list}>
					{data.items?.map((item) => {
						return (
							<li key={item.isbn}>
								<Book item={item} />
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
}
