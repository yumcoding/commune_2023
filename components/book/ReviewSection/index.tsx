"use client";
import { useParams, usePathname } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import { ChevronDownDoubleIcon, NoListItemIcon, PencilIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { fetcher } from "@/lib/front/fetchers";
import { ReviewsTypes } from "@/types/db";
import { useSession } from "next-auth/react";
import ReviewItem from "../ReviewItem";
import { useEffect, useState } from "react";

export default function ReviewSection() {
	const { reviewHeader, reviewWriteBtn, loadMoreReviewBtn } = styles;

	const pathname = usePathname();
	const params = useParams();

	const session = useSession();
	const userId = session?.data?.user?.id;

	const [page, setPage] = useState(1);

	const { data } = useSWR<ReviewsTypes>(`/api/book/${params.isbn}/reviews?page=${page}`, fetcher);

	const totalNum = data?.data ? data.data.length : 0;

	const myReview = data?.data && userId ? data?.data.find((review) => review.userId === userId) : null;

	const onClickShowMoreReivew = () => setPage((prev) => prev + 1);

	return (
		<>
			<div className={reviewHeader}>
				<h2>
					리뷰<small>({totalNum})</small>
				</h2>

				{userId && (
					<Link href={`${pathname}/write-review`} className={reviewWriteBtn}>
						<span>리뷰 {myReview ? "수정하기" : "작성하기"}</span>
						<PencilIcon />
					</Link>
				)}
			</div>
			{!data ? null : data?.data.length > 0 ? (
				<ul>
					{data?.data.map((review) => (
						<ReviewItem key={review.id} review={review} />
					))}
				</ul>
			) : (
				<NoListItemIcon />
			)}

			{/* TODO : pagination */}
			<button type="button" className={loadMoreReviewBtn} onClick={onClickShowMoreReivew}>
				<span>리뷰 더 읽기</span>
				<ChevronDownDoubleIcon />
			</button>
		</>
	);
}
