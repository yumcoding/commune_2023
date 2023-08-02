"use client";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import { searchFetcher } from "@/lib/front/fetchers";
import { PAGE_SIZE } from "@/components/search/SearchResult";
import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ query, pageIndex }: { query: string; pageIndex: number }) {
	const { data, isLoading } = useSWR(query?.length > 0 ? `/openapi/v1/search/book.json?query=${query}&display=${PAGE_SIZE}&start=${PAGE_SIZE * (pageIndex - 1) + 1}` : null, searchFetcher);

	const getPageCount = () => {
		if (!data?.total) {
			return 0;
		} else {
			if (Math.ceil(data.total / PAGE_SIZE) >= 99) {
				return 99;
			} else {
				return Math.ceil(data.total / PAGE_SIZE);
			}
		}
	};

	const router = useRouter();
	function handlePageClick(selectedItem: { selected: number }): void {
		router.push(`/search?query=${query}&pageIndex=${selectedItem.selected}`);
	}

	if (isLoading) return null;

	return (
		<>
			<ReactPaginate pageCount={getPageCount()} onPageChange={handlePageClick} pageRangeDisplayed={5} breakLabel="..." nextLabel=">" previousLabel="<" renderOnZeroPageCount={null} />
		</>
	);
}
