"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { searchFetcher } from "@/lib/front/fetchers";
import Loader from "@/components/common/Loader";
import { NoResultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import convertStrToDate from "@/lib/front/convertStrToDate";
import { SearchResultTypes } from "@/types/db";

export const PAGE_SIZE = 10;

export default function SearchResult({ query, pageIndex }: { query: string; pageIndex: number }) {
	const { list, listItem, bookInfo, desc, noResult } = styles;

	const { data, isLoading } = useSWR<SearchResultTypes>(
		query?.length > 0 ? `/openapi/v1/search/book.json?query=${query}&display=${PAGE_SIZE}&start=${PAGE_SIZE * (pageIndex - 1) + 1}` : null,
		searchFetcher
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	// to resize image and decide whether to show a book desc.
	const [device, setDevice] = useState(window.innerWidth < 720 ? "sm" : "md");
	const imageWidth = device === "sm" ? 60 : 100;
	const imageHeight = imageWidth * 1.4537037;

	useEffect(() => {
		const handleWindowResize = () => {
			setDevice(window.innerWidth < 720 ? "sm" : "md");
		};
		window.addEventListener("resize", handleWindowResize);
		return () => window.removeEventListener("resize", handleWindowResize);
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
						<div>
							<Image src={item.image} width={imageWidth} height={imageHeight} alt={`${item.title} 책 커버`} style={{ background: "grey" }} />
						</div>
						<div className={bookInfo}>
							<h1>{item.title}</h1>
							<p>
								{item.author.replaceAll("^", ", ")} | {convertStrToDate(item.pubdate)}
							</p>
							{device === "md" && <p className={desc}>{item.description}</p>}
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
