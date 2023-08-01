"use client";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import { searchFetcher } from "@/lib/front/fetchers";
import { PAGE_SIZE } from "@/components/search/SearchResult";

export default function Pagination({ query, pageIndex, setPageIndex }: { query: string; pageIndex: number; setPageIndex: React.Dispatch<React.SetStateAction<number>> }) {
	const { data, isLoading, error } = useSWR(query?.length > 0 ? `/openapi/v1/search/book.json?query=${query}&display=${PAGE_SIZE}&start=${PAGE_SIZE * pageIndex + 1}` : null, searchFetcher);

	// Here we use item offsets; we could also use page offsets
	// following the API or data you're working with.
	const [itemOffset, setItemOffset] = useState(0);

	// Simulate fetching items from another resources.
	// (This could be items from props; or items loaded in a local state
	// from an API endpoint with useEffect and useState)
	// const endOffset = itemOffset + itemsPerPage;
	// console.log(`Loading items from ${itemOffset} to ${endOffset}`);
	// const currentItems = items.slice(itemOffset, endOffset);
	// const pageCount = Math.ceil(items.length / itemsPerPage);

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

	// Invoke when user click to request another page.

	function handlePageClick(selectedItem: { selected: number }): void {
		setPageIndex(selectedItem.selected);
	}

	// 	const handlePageClick: (event: {
	//     selected: number;
	// }): void = (event) => {
	// 		// const newOffset = (event.selected * itemsPerPage) % items.length;
	// 		// console.log(
	// 		//   `User requested page number ${event.selected}, which is offset ${newOffset}`
	// 		// );
	// 		// setItemOffset(newOffset);
	// 	};

	if (isLoading) return null;

	return (
		<>
			<ReactPaginate pageCount={getPageCount()} onPageChange={handlePageClick} pageRangeDisplayed={5} breakLabel="..." nextLabel="next >" previousLabel="< previous" renderOnZeroPageCount={null} />
		</>
	);
}
