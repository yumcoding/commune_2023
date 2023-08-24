"use client";
import useSWR from "swr";
import { SearchResultTypes } from "@/types/db";
import { noRevalidationOption, searchFetcher } from "@/lib/front/fetchers";
import BookSlider from "@/components/common/BookSlider";

export default function SearchBookList({ query }: { query: string }) {
	const { data, isLoading } = useSWR<SearchResultTypes>(query?.length > 0 ? `/openapi/v1/search/book.json?query=${query}&display=10` : null, searchFetcher, noRevalidationOption);

	const list = data?.items?.map((item) => {
		return {
			bookIsbn: item.isbn,
			bookImage: item.image,
			bookTitle: item.title,
			bookAuthor: item.author,
		};
	});

	return <BookSlider list={list} isLoading={isLoading} />;
}
