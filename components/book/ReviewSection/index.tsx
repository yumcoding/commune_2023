"use client";
import { useParams, usePathname } from "next/navigation";
import useSWRInfinite from "swr/infinite";
import Link from "next/link";
import { ChevronDownDoubleIcon, NoListItemIcon, PencilIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { fetcher } from "@/lib/front/fetchers";
import { ReviewsTypes } from "@/types/db";
import { useSession } from "next-auth/react";
import ReviewItem from "../ReviewItem";
import { useEffect, useState } from "react";

const PAGE_SIZE = 1;

export default function ReviewSection() {
	const { reviewHeader, reviewWriteBtn, loadMoreReviewBtn } = styles;

	const pathname = usePathname();
	const params = useParams();

	const session = useSession();
	const userId = session?.data?.user?.id;

	const [cursor, setCursor] = useState("");

	const { data, mutate, size, setSize, isValidating, isLoading } = useSWRInfinite((index) => `/api/book/${params.isbn}/reviews?page=${index}`, fetcher);

	const reviews = data ? [].concat(...data) : [];
	const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
	const isEmpty = data?.[0]?.length === 0;
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
	const isRefreshing = isValidating && data && data.length === size;

	console.log("data", data);
	// const totalNum = data?.data ? data.data.length : 0;

	// const myReview = data?.data && userId ? data?.data.find((review) => review.userId === userId) : null;

	const onClickShowMoreReivew = () => {
		// setCursor(data ? data[data.length - 1][0].id : "0");
		setSize(size + 1);
	};

	return (
		<>
			{/* <div className={reviewHeader}>
				<h2>
					리뷰<small>({totalNum})</small>
				</h2> */}
			{/* 
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
			)} */}

			{/* TODO : pagination */}
			<button type="button" className={loadMoreReviewBtn} onClick={onClickShowMoreReivew}>
				<span>리뷰 더 읽기</span>
				<ChevronDownDoubleIcon />
			</button>
		</>
	);
}
