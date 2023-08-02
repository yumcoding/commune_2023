"use client";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { searchFetcher } from "@/lib/front/fetchers";
import Loader from "@/components/common/Loader";
import { NoResultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

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

const strToDate = (str: string) => {
	return `${str.substring(0, 4)}.${str.substring(4, 6)}.${str.substring(6)}`;
};

export default function SearchResult({ query, pageIndex }: { query: string; pageIndex: number }) {
	const { listItem, bookInfo, noResult } = styles;

	const { data, isLoading, error } = useSWR<SearchResultTypes>(
		query?.length > 0 ? `/openapi/v1/search/book.json?query=${query}&display=${PAGE_SIZE}&start=${PAGE_SIZE * (pageIndex - 1) + 1}` : null,
		searchFetcher
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	if (isLoading) return <Loader isSmall={false} />;

	if (data && data.total === 0)
		return (
			<>
				<div className={noResult}>
					<NoResultIcon />
					<p>
						검색 결과가 없어요. <br /> 다른 검색어를 입력해보세요.
					</p>
				</div>
			</>
		);

	return (
		<ul>
			{data?.items.map((item) => (
				<li key={item.isbn} className={listItem}>
					<Link href={`/book/${item.isbn}`}>
						<div>
							<Image src={item.image} width={60} height={87} alt={`${item.title} 책 커버`} style={{ background: "grey" }} />
						</div>
						<div className={bookInfo}>
							<h1>{item.title}</h1>
							<p>
								{item.author.replaceAll("^", ", ")} | {strToDate(item.pubdate)}
							</p>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
