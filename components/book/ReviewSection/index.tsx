"use client";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import Link from "next/link";
import { fetcher, noRevalidationOption } from "@/lib/front/fetchers";
import { ReviewWithUser } from "@/types/db";
import ReviewItem from "../ReviewItem";
import { ChevronDownDoubleIcon, HorizontalLoaderIcon, NoListItemIcon, PencilIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
const PAGE_SIZE = 10;

export default function ReviewSection() {
	const { reviewHeader, reviewWriteBtn, noListWrapper, isLoadingWrapper, loadMoreReviewBtn } = styles;

	const pathname = usePathname();
	const params = useParams();

	const session = useSession();
	const userId = session?.data?.user?.id;

	const { data: reviewData, size, setSize, isLoading } = useSWRInfinite<ReviewWithUser[]>((index) => `/api/book/${params.isbn}/reviews?page=${index}`, fetcher);
	const { data: totalNum } = useSWR(`/api/book/${params.isbn}/reviews/total`, fetcher, noRevalidationOption);

	const reviews = reviewData ? ([] as ReviewWithUser[]).concat(...reviewData) : [];
	const isLoadingMore = isLoading || (size > 0 && reviewData && typeof reviewData[size - 1] === "undefined");
	const isEmpty = reviewData?.[0]?.length === 0;
	const isReachingEnd = isEmpty || (reviewData && reviewData[reviewData.length - 1]?.length < PAGE_SIZE);

	const onClickShowMoreReivew = () => setSize(size + 1);

	return (
		<>
			<div className={reviewHeader}>
				<h2>
					리뷰<small>({totalNum && totalNum > 999 ? "999+" : totalNum})</small>
				</h2>
			</div>

			{isEmpty && (
				<div className={noListWrapper}>
					<NoListItemIcon />
					<p>아직 작성된 리뷰가 없어요.</p>
					<p>혹시 책을 읽었다면, 리뷰를 작성해봐요 :)</p>
				</div>
			)}

			<ul>
				{reviews.map((review) => (
					<ReviewItem key={review.id} review={review} />
				))}
			</ul>

			{isLoadingMore && (
				<div className={isLoadingWrapper}>
					<HorizontalLoaderIcon />
				</div>
			)}

			{!isReachingEnd && (
				<button type="button" className={loadMoreReviewBtn} onClick={onClickShowMoreReivew}>
					<span>리뷰 더 읽기</span>
					<ChevronDownDoubleIcon />
				</button>
			)}
		</>
	);
}
