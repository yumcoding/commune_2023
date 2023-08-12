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
import styles from "@/components/book/ReviewSection/styles.module.scss";
import itemStyles from "./styles.module.scss";
import sectionStyles from "@/app/book/[isbn]/styles.module.scss";

export default function MyReviewSection() {
	const { reviewHeader, reviewWriteBtn, noListWrapper, isLoadingWrapper } = styles;
	const { sectionContentWrapper } = sectionStyles;
	const { section, reviewItem } = itemStyles;

	const pathname = usePathname();

	const params = useParams();
	const { data: myReview, isLoading } = useSWR(`/api/book/${params.isbn}/reviews/mine`, fetcher, noRevalidationOption);

	// session 없는 경우, 즉 로그인하지 않은 경우 return null
	const session = useSession();
	const userId = session?.data?.user?.id;

	if (!userId) return null;

	return (
		<section className={section}>
			<div className={sectionContentWrapper}>
				<div className={reviewHeader}>
					<h2>나의 리뷰</h2>
					<Link href={`${pathname}/write-review`} className={reviewWriteBtn}>
						<span>{myReview?.review ? "수정하기" : "작성하기"}</span>
						<PencilIcon />
					</Link>
				</div>

				{isLoading ? (
					<div className={isLoadingWrapper}>
						<HorizontalLoaderIcon />
					</div>
				) : myReview?.review ? (
					<>
						<div className={reviewItem}>
							<ReviewWriter title={myReview.review.title} name={myReview.review.user.name} image={myReview.review.user.image} updatedAt={myReview.review.updatedAt} />
							<ReviewContent content={myReview.review.content} />
							<IsLikedBtn reviewId={myReview.review.id} />
						</div>
					</>
				) : (
					<>
						<div className={noListWrapper}>
							<NoListItemIcon />
							<p>아직 작성된 리뷰가 없어요.</p>
							<p>혹시 책을 읽었다면, 리뷰를 작성해봐요 :)</p>
						</div>
					</>
				)}
			</div>
		</section>
	);
}
