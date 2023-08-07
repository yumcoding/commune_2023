"use client";
import ReviewItem from "../ReviewItem";
import { ChevronDownDoubleIcon, NoListItemIcon, PencilIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function ReviewSection() {
	const { reviewHeader, reviewWriteBtn, loadMoreReviewBtn } = styles;

	const pathname = usePathname();
	const params = useParams();

	const fetchData = async () => {
		const res = await fetch(`/api/book/${params.isbn}/reviews`);
		const data = await res.json();
		console.log("data", data);
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className={reviewHeader}>
				<h2>
					리뷰<small>(999+)</small>
				</h2>
				<Link href={`${pathname}/write-review`} className={reviewWriteBtn}>
					<span>리뷰 작성하기</span>
					<PencilIcon />
				</Link>
			</div>

			<ul>
				{/* <ReviewItem key="da123" />
				<ReviewItem key="4da56" />
				<ReviewItem key="78aa9" /> */}
			</ul>

			{/* 데이터 없는 경우 */}
			{/* <NoListItemIcon /> */}

			<button type="button" className={loadMoreReviewBtn}>
				<span>리뷰 더 읽기</span>
				<ChevronDownDoubleIcon />
			</button>
		</>
	);
}
