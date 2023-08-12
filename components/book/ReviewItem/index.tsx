"use client";
import { useState } from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { fetcher } from "@/lib/front/fetchers";
import useMutation from "@/hooks/useMutation";
import { cls } from "@/lib/front/cls";
import { ReviewItemTypes, ReviewWithUser } from "@/types/db";
import { ChevronDownIcon, ChevronUpIcon, OutlineStarIcon, SolidStarIcon, LoginIcon, OutlineThumbUpIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function ReviewItem(props: { review: ReviewWithUser }) {
	const { flexbox, flexboxBetween, reviewItem, reviewWriter, writerAvatar, writerInfo, reviewTitle, author, date, rating, reviewText, moreText, btnWrapper, showMoreBtn, thumbBtnWrapper, isLiked } =
		styles;

	const [showMore, setShowMore] = useState(false);
	const toggleShowMore = () => setShowMore((prev) => !prev);

	const params = useParams();

	const {
		id,
		user: { name, image },
		updatedAt,
		title,
		content,
	} = props.review;

	const [toggleLikes] = useMutation(`/api/book/${params.isbn}/reviews/${id}/likes`, "POST");

	const { data: reviewItemData, mutate } = useSWR<ReviewItemTypes>(`/api/book/${params.isbn}/reviews/${id}`, fetcher);
	console.log("reviewItemData", reviewItemData);
	const onClickLike = () => {
		if (!reviewItemData) return;
		const currentLikesNum = reviewItemData.review._count.likes;
		const alreadyLiked = reviewItemData.isLiked;
		mutate(
			(prev) =>
				prev && {
					...prev,
					review: {
						...prev.review,
						_count: {
							likes: alreadyLiked ? currentLikesNum - 1 : currentLikesNum + 1,
						},
					},
					isLiked: !prev.isLiked,
				},
			false
		);
		toggleLikes({});
	};

	return (
		<>
			<li className={reviewItem}>
				{/* ---------------------- */}
				<div className={reviewWriter}>
					<div className={writerAvatar}>
						{/* TODO : 사용자 아바타  */}
						<LoginIcon />
					</div>

					<div className={writerInfo}>
						<h3 className={reviewTitle}>{title}</h3>

						<div className={flexboxBetween}>
							<div className={flexbox}>
								<strong className={author}>{name || "익명의 꼬뮤니"}</strong>
								<small className={date}>{updatedAt.toString().slice(0, 10).replaceAll("-", ".")}</small>
							</div>
							{/* TODO : 책 별점 */}
							{/* <div className={cls(flexbox, rating)}>
								<SolidStarIcon />
								<SolidStarIcon />
								<SolidStarIcon />
								<SolidStarIcon />
								<OutlineStarIcon />
							</div> */}
						</div>
					</div>
				</div>

				<div className={cls(reviewText, showMore ? moreText : "")}>
					<p>{content}</p>
				</div>

				<div className={btnWrapper}>
					<button type="button" onClick={toggleShowMore} className={cls(flexbox, showMoreBtn)}>
						{showMore ? (
							<>
								접기
								<ChevronUpIcon />
							</>
						) : (
							<>
								펼쳐보기
								<ChevronDownIcon />
							</>
						)}
					</button>
					<div className={cls(thumbBtnWrapper, reviewItemData?.isLiked ? isLiked : "")}>
						<button type="button" onClick={onClickLike}>
							<OutlineThumbUpIcon />
						</button>
						<span>({reviewItemData?.review._count.likes})</span>
					</div>
				</div>
			</li>
		</>
	);
}
