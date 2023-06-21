"use client";
import ReviewItem from "../ReviewItem";
import { ChevronDownDoubleIcon, PencilIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ReviewSection() {
	const { reviewHeader, reviewWriteBtn, loadMoreReviewBtn } = styles;

	const pathname = usePathname();

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
				<ReviewItem key="da123" />
				<ReviewItem key="4da56" />
				<ReviewItem key="78aa9" />
			</ul>

			<button type="button" className={loadMoreReviewBtn}>
				<span>리뷰 더 읽기</span>
				<ChevronDownDoubleIcon />
			</button>
		</>
	);
}
