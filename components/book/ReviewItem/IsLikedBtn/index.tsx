"use client";
import useSWR from "swr";
import { cls } from "@/lib/front/cls";
import { OutlineThumbUpIcon } from "@/assets/icons";
import useMutation from "@/hooks/useMutation";
import { useParams } from "next/navigation";
import { ReviewItemTypes } from "@/types/db";
import { fetcher } from "@/lib/front/fetchers";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";

export default function IsLikedBtn(props: { reviewId: number }) {
	const { thumbBtnWrapper, isLiked } = styles;

	const params = useParams();
	const session = useSession();

	const [toggleLikes] = useMutation(`/api/book/${params.isbn}/reviews/${props.reviewId}/likes`, "POST");

	const { data: reviewItemData, mutate } = useSWR<ReviewItemTypes>(`/api/book/${params.isbn}/reviews/${props.reviewId}/likes`, fetcher);

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
			<div className={cls(thumbBtnWrapper, reviewItemData?.isLiked ? isLiked : "")}>
				<button type="button" onClick={onClickLike} disabled={session?.status === "unauthenticated"}>
					<OutlineThumbUpIcon />
				</button>
				<span>({reviewItemData?.review._count.likes})</span>
			</div>
		</>
	);
}
