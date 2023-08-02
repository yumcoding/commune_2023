"use client";
import ReactPaginate from "react-paginate";
import useSWR from "swr";
import { searchFetcher } from "@/lib/front/fetchers";
import { PAGE_SIZE } from "@/components/search/SearchResult";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";
interface PageClickEventTypes {
	index: number | null;
	selected: number;
	nextSelectedPage: number | undefined;
	event: object;
	isPrevious: boolean;
	isNext: boolean;
	isBreak: boolean;
	isActive: boolean;
}

export default function Pagination({ query, pageIndex }: { query: string; pageIndex: number }) {
	const { hidden, wrapper, list, item, active,ellipsis } = styles;

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

	const onClick = (e: PageClickEventTypes) => {
		const nextPageIndex = e.nextSelectedPage ? e.nextSelectedPage + 1 : 1;
		router.push(`/search?query=${query}&pageIndex=${nextPageIndex}`);
	};

	if (isLoading) return null;

	return (
		<div className={wrapper}>
			<ReactPaginate
				pageCount={getPageCount()}
				onClick={onClick}
				pageRangeDisplayed={5}
				marginPagesDisplayed={2}
				previousClassName={hidden}
				nextClassName={hidden}
				containerClassName={list}
				pageClassName={item}
				activeClassName={active}
				breakClassName={ellipsis}
				initialPage={pageIndex - 1}
				breakLabel="..."
				renderOnZeroPageCount={null}
			/>
		</div>
	);
}
