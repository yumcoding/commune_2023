"use client";
import useSWR from "swr";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { HorizontalLoaderIcon, NoListItemIcon, PencilIcon } from "@/assets/icons";
import { fetcher, noRevalidationOption } from "@/lib/front/fetchers";
import ReviewWriter from "../ReviewItem/ReviewWriter";
import ReviewContent from "../ReviewItem/ReviewContent";
import IsLikedBtn from "../ReviewItem/IsLikedBtn";

import { cls } from "@/lib/front/cls";
import styles from "@/components/book/ReviewSection/styles.module.scss";
import itemStyles from "./styles.module.scss";

export default function MyReviewSection() {
	const { reviewHeader, reviewWriteBtn, noListWrapper, hasBorderBottom, isLoadingWrapper } = styles;
	const { reviewItem } = itemStyles;

	const pathname = usePathname();

	// session 없는 경우, 즉 로그인하지 않은 경우 return null
	const session = useSession();
	const userId = session?.data?.user?.id;

	const params = useParams();
	const { data: myReview, isLoading } = useSWR(userId ? `/api/book/${params.isbn}/reviews/user` : null, fetcher);
	if (!userId) return null;

	return (
		<>
			<div className={reviewHeader}>
				<h2>나의 리뷰</h2>
				<Link href={`${pathname}/write-review`} className={reviewWriteBtn}>
					<span>{myReview?.data ? "수정하기" : "작성하기"}</span>
					<PencilIcon />
				</Link>
			</div>

			{isLoading ? (
				<div className={isLoadingWrapper}>
					<HorizontalLoaderIcon />
				</div>
			) : myReview?.data ? (
				<>
					<div className={reviewItem}>
						<ReviewWriter
							title={myReview.data.title}
							name={myReview.data?.user?.name ?? ""}
							image={myReview.data?.user?.image ?? ""}
							updatedAt={myReview.data.updatedAt}
							rating={Number(myReview.data.rating)}
						/>
						<ReviewContent content={myReview.data.content} />
						<IsLikedBtn reviewId={myReview.data.id} />
					</div>
				</>
			) : (
				<>
					<div className={cls(noListWrapper, hasBorderBottom)}>
						<NoListItemIcon />
						<p>혹시 책을 읽으셨나요😀?</p>
						<p>리뷰를 작성해 책을 읽은 소감을 나눠주세요!</p>
					</div>
				</>
			)}
		</>
	);
}
