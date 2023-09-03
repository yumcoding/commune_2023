"use client";

import { recentSearch, popularSearch } from "@/assets/mockData";
import { useSearchParams } from "next/navigation";

import styles from "./styles.module.scss";
import Link from "next/link";

export default function SearchRecommendation({ isRecent }: { isRecent: Boolean }) {
	const { section, header, delBtn, list } = styles;

	const searchParams = useSearchParams();

	const search = searchParams.get("query");

	if (search && search?.length > 0) return null;

	return (
		<section className={section}>
			<header className={header}>
				<h2>{isRecent ? "최근 검색어" : "인기 검색어"}</h2>
				{isRecent && (
					<button type="button" className={delBtn}>
						모두 삭제
					</button>
				)}
			</header>
			{isRecent ? (
				<ul className={list}>
					{recentSearch?.map((item, _) => (
						<li key={item.id}>
							<Link href={`/search?query=${item.query}&pageIndex=1`}>{item.query}</Link>
						</li>
					))}
				</ul>
			) : (
				<ul className={list}>
					{popularSearch?.map((item, _) => (
						<li key={item.id}>
							<Link href={`/search?query=${item.query}&pageIndex=1`}>{item.query}</Link>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
