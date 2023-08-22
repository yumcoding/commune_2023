"use client";
import useSWR from "swr";

import BookSwiper from "@/components/common/BookSwiper";
import { SearchResultTypes } from "@/types/db";
import { noRevalidationOption, searchFetcher } from "@/lib/front/fetchers";

const PAGE_SIZE = 10;

export default function SearchBookList({ query }: { query: string }) {
	const { data, isLoading } = useSWR<SearchResultTypes>(query?.length > 0 ? `/openapi/v1/search/book.json?query=${query}&display=${PAGE_SIZE}` : null, searchFetcher, {
		...noRevalidationOption,
		suspense: true,
	});

	const list = data?.items?.map((item) => {
		return {
			bookIsbn: item.isbn,
			bookImage: item.image,
			bookTitle: item.title,
			bookAuthor: item.author,
		};
	});

	if (isLoading) return;

	return <BookSwiper list={list} />;
}
