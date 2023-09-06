"use client";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { fetcher } from "@/lib/front/fetchers";
import { ChevronDownDoubleIcon, HorizontalLoaderIcon, NoListItemIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import showCount from "@/lib/front/showCount";
import { ReviewWithLikes, UserInfoTypes } from "@/types/db";
import UserReviewItem from "../UserReviewItem";
import reviewStyles from "@/components/book/ReviewSection/styles.module.scss";
import { useState } from "react";
import DefaultModalOverlay from "@/components/common/Modal/DefaultModalOverlay";
import ReviewWriteModalContent from "@/components/book/ReviewWriteModalContent";

const PAGE_SIZE = 5;

export default function UserReviewSection() {
	const { reviewSection, noItem } = styles;
	const { isLoadingWrapper, loadMoreReviewBtn } = reviewStyles;

	const { data: userInfo } = useSWR<UserInfoTypes>(`/api/user/profile`, fetcher);
	const { data: reviewData, size, setSize, isLoading, mutate } = useSWRInfinite<ReviewWithLikes[]>((index) => `/api/user/reviews?page=${index}`, fetcher);

	const reviews = reviewData ? ([] as ReviewWithLikes[]).concat(...reviewData) : [];
	const isLoadingMore = isLoading || (size > 0 && reviewData && typeof reviewData[size - 1] === "undefined");
	const isEmpty = reviewData?.[0]?.length === 0;
	const isReachingEnd = isEmpty || (reviewData && reviewData[reviewData.length - 1]?.length < PAGE_SIZE);

	const onClickShowMoreReivew = () => setSize(size + 1);

	const [editBookIsbn, setEditBookIsbn] = useState("");
	const [isModalVisible, setIsModalVisible] = useState(false);

	const onClickCloseEditModal = () => {
		setIsModalVisible(false);
		setEditBookIsbn("");
	};

	const onClickEdit = (isbn: string) => {
		setEditBookIsbn(isbn);
		setIsModalVisible(true);
	};

	return (
		<>
			<section className={reviewSection}>
				<h1>
					작성한 리뷰 <small>({userInfo?.user?._count?.reviews ? showCount(userInfo?.user?._count?.reviews) : ""})</small>
				</h1>

				{isEmpty && (
					<div className={noItem}>
						<NoListItemIcon />
						<p>아직 작성한 리뷰가 없어요.</p>
					</div>
				)}

				<ul>
					{reviews.map((review) => (
						<UserReviewItem key={review.id} review={review} onClickEdit={onClickEdit} />
					))}
				</ul>

				{isLoadingMore && (
					<div className={isLoadingWrapper}>
						<HorizontalLoaderIcon />
					</div>
				)}

				{!isLoading && !isReachingEnd && (
					<button type="button" className={loadMoreReviewBtn} onClick={onClickShowMoreReivew}>
						<span>리뷰 더 읽기</span>
						<ChevronDownDoubleIcon />
					</button>
				)}

				{/* 작성한 책 리뷰 있을 때 --- 5개씩, 최신순, pagination */}
			</section>
			{isModalVisible && (
				<DefaultModalOverlay onClickOverlay={onClickCloseEditModal}>
					<ReviewWriteModalContent isbn={editBookIsbn} isModal setIsModalVisible={setIsModalVisible} />
				</DefaultModalOverlay>
			)}
		</>
	);
}
