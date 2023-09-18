"use client";
import { useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { searchFetcher } from "@/lib/front/fetchers";
import Loader from "@/components/common/Loader";
import { NoResultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import convertStrToDate from "@/lib/front/convertStrToDate";
import { SearchResultTypes } from "@/types/db";

export const PAGE_SIZE = 10;

export default function SearchResult({ query, pageIndex }: { query: string; pageIndex: number }) {
	const { list, listItem, bookCover, bookInfo, desc, noResult } = styles;

	const { data, isLoading } = useSWR<SearchResultTypes>(
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
						검색 결과가 없어요. <br /> 검색어를 다시 입력해주세요.
					</p>
				</div>
			</>
		);

	return (
		<ul className={list}>
			{data?.items.map((item) => (
				<li key={item.isbn} className={listItem}>
					<Link href={`/book/${item.isbn}`}>
						<div className={bookCover}>
							<img src={item.image} alt={`${item.title} 책 커버`} style={{ background: "grey" }} />
						</div>
						<div className={bookInfo}>
							<h1>{item.title}</h1>
							<p>
								{item.author.replaceAll("^", ", ")} | {convertStrToDate(item.pubdate)}
							</p>
							<p className={desc}>{item.description}</p>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
