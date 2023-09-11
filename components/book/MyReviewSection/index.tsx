"use client";

import useSWR from "swr";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { HorizontalLoaderIcon, NoListItemIcon, PencilIcon } from "@/assets/icons";
import { fetcher } from "@/lib/front/fetchers";
import ReviewWriter from "../ReviewItem/ReviewWriter";
import ReviewContent from "../ReviewItem/ReviewContent";
import IsLikedBtn from "../ReviewItem/IsLikedBtn";

import { cls } from "@/lib/front/cls";
import styles from "@/components/book/ReviewSection/styles.module.scss";
import itemStyles from "./styles.module.scss";
import { useState } from "react";
import DefaultModalOverlay from "@/components/common/Modal/DefaultModalOverlay";
import ReviewWriteModalContent from "../ReviewWriteModalContent";

export default function MyReviewSection() {
	const { reviewHeader, reviewWriteBtn, noListWrapper, hasBorderBottom, isLoadingWrapper } = styles;
	const { reviewItem } = itemStyles;

	// session 없는 경우, 즉 로그인하지 않은 경우 return null
	const session = useSession();
	const userId = session?.data?.user?.id;

	const params = useParams();
	const { data: myReview, isLoading } = useSWR(userId ? `/api/book/${params.isbn}/reviews/user` : null, fetcher);

	// review write modal
	const [isModalVisible, setIsModalVisible] = useState(false);
	const onClickWriteModal = () => setIsModalVisible(true);
	const onClickCloseModal = () => setIsModalVisible(false);

	if (!userId) return null;

	return (
		<>
			<div className={reviewHeader}>
				<h2>나의 리뷰</h2>
				{!isLoading && (
					<button type="button" className={reviewWriteBtn} onClick={onClickWriteModal}>
						<span>{myReview?.data ? "수정하기" : "작성하기"}</span>
						<PencilIcon />
					</button>
				)}
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
						<IsLikedBtn reviewId={myReview.data.id} key={`${crypto.randomUUID()}${myReview.data.id}`} />
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
			{isModalVisible && (
				<DefaultModalOverlay onClickOverlay={onClickCloseModal}>
					<ReviewWriteModalContent isbn={params.isbn} isModal setIsModalVisible={setIsModalVisible} />
				</DefaultModalOverlay>
			)}
		</>
	);
}
