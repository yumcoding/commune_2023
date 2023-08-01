"use client";
import useSWR from "swr";
import { searchFetcher } from "@/lib/front/fetchers";
import { NoResultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import Image from "next/image";
import Loader from "@/components/common/Loader";

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

export default function SearchResult({ query, pageIndex }: { query: string; pageIndex: number }) {
	const { wrapper, list, noResult } = styles;

	const { data, isLoading, error } = useSWR<SearchResultTypes>(
		query?.length > 0 ? `/openapi/v1/search/book.json?query=${query}&display=${PAGE_SIZE}&start=${PAGE_SIZE * pageIndex + 1}` : null,
		searchFetcher
	);

	if (isLoading) return <Loader isSmall={false} />;

	return (
		<ul>
			{data?.items.map((item) => (
				<li key={item.isbn}>
					<div>
						<Image src={item.image} width={50} height={50} alt={`${item.title} 책 커버`} style={{ background: "grey" }} />
					</div>
					<div>
						<h1>{item.title}</h1>
						<p>
							<strong>
								{item.author.replaceAll("^", ", ")} | {item.publisher}
							</strong>
						</p>
					</div>
				</li>
			))}
		</ul>
	);
}
