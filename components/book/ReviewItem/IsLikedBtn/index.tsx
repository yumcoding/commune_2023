"use client";
import useSWR from "swr";
import useMutation from "@/hooks/useMutation";
import { useParams } from "next/navigation";
import { ReviewItemTypes } from "@/types/db";
import { fetcher } from "@/lib/front/fetchers";
import styles from "./styles.module.scss";
import { useSession } from "next-auth/react";

export default function IsLikedBtn(props: { reviewId: number }) {
	const { container, isLikedWrapper, checkbox, heart, mainCirc, grp1, grp2, grp3, grp4, grp5, grp6, grp7, oval1, oval2, count } = styles;

	const params = useParams();
	const session = useSession();

	const [toggleLikes] = useMutation(`/api/book/${params.isbn}/reviews/${props.reviewId}/likes`, "POST");

	const { data: reviewItemData, mutate } = useSWR<ReviewItemTypes>(`/api/book/${params.isbn}/reviews/${props.reviewId}/likes`, fetcher);

	const onChangeCheckbox = () => {
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
		<div className={container}>
			<form className={isLikedWrapper}>
				<input type="checkbox" id="checkbox" className={checkbox} disabled={session?.status === "unauthenticated"} checked={reviewItemData?.isLiked} onChange={onChangeCheckbox} />
				<label htmlFor="checkbox">
					<svg id="heart-svg" viewBox="467 392 58 57" xmlns="http://www.w3.org/2000/svg">
						<g id="Group" fill="none" fillRule="evenodd" transform="translate(467 392)">
							<path
								d="M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
								id="heart"
								className={heart}
								fill="#AAB8C2"
							/>
							<circle id="main-circ" className={mainCirc} fill="#E2264D" opacity="0" cx="29.5" cy="29.5" r="1.5" />

							<g id="grp7" className={grp7} opacity="0" transform="translate(7 6)">
								<circle id="oval1" className={oval1} fill="#9CD8C3" cx="2" cy="6" r="2" />
								<circle id="oval2" className={oval2} fill="#8CE8C3" cx="5" cy="2" r="2" />
							</g>

							<g id="grp6" className={grp6} opacity="0" transform="translate(0 28)">
								<circle id="oval1" className={oval1} fill="#CC8EF5" cx="2" cy="7" r="2" />
								<circle id="oval2" className={oval2} fill="#91D2FA" cx="3" cy="2" r="2" />
							</g>

							<g id="grp3" className={grp3} opacity="0" transform="translate(52 28)">
								<circle id="oval2" className={oval2} fill="#9CD8C3" cx="2" cy="7" r="2" />
								<circle id="oval1" className={oval1} fill="#8CE8C3" cx="4" cy="2" r="2" />
							</g>

							<g id="grp2" className={grp2} opacity="0" transform="translate(44 6)">
								<circle id="oval2" className={oval2} fill="#CC8EF5" cx="5" cy="6" r="2" />
								<circle id="oval1" className={oval1} fill="#CC8EF5" cx="2" cy="2" r="2" />
							</g>

							<g id="grp5" className={grp5} opacity="0" transform="translate(14 50)">
								<circle id="oval1" className={oval1} fill="#91D2FA" cx="6" cy="5" r="2" />
								<circle id="oval2" className={oval2} fill="#91D2FA" cx="2" cy="2" r="2" />
							</g>

							<g id="grp4" className={grp4} opacity="0" transform="translate(35 50)">
								<circle id="oval1" className={oval1} fill="#F48EA7" cx="6" cy="5" r="2" />
								<circle id="oval2" className={oval2} fill="#F48EA7" cx="2" cy="2" r="2" />
							</g>

							<g id="grp1" className={grp1} opacity="0" transform="translate(24)">
								<circle id="oval1" className={oval1} fill="#9FC7FA" cx="2.5" cy="3" r="2" />
								<circle id="oval2" className={oval2} fill="#9FC7FA" cx="7.5" cy="2" r="2" />
							</g>
						</g>
					</svg>
				</label>
			</form>
			<span className={count}>({reviewItemData?.review._count.likes})</span>
		</div>
	);
}
