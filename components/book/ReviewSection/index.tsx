"use client";
import { useParams, usePathname } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import ReviewItem from "../ReviewList";
import { ChevronDownDoubleIcon, NoListItemIcon, PencilIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { fetcher } from "@/lib/front/fetchers";
import { ReviewsTypes } from "@/types/db";

export default function ReviewSection() {
	const { reviewHeader, reviewWriteBtn, loadMoreReviewBtn } = styles;

	const pathname = usePathname();
	const params = useParams();

	const { data } = useSWR<ReviewsTypes>(`/api/book/${params.isbn}/reviews`, fetcher);

	const totalNum = data?.data ? data.data.length : 0;

	return (
		<>
			<div className={reviewHeader}>
				<h2>
					리뷰<small>({totalNum})</small>
				</h2>
				{/* TODO : 이미 작성한 리뷰가 있는 경우 */}
				<Link href={`${pathname}/write-review`} className={reviewWriteBtn}>
					<span>리뷰 작성하기</span>
					<PencilIcon />
				</Link>
			</div>
			{/* TODO : 에러, 아이템 없는 경우, 리스트 */}
			{data?.data && data.data.length > 0 ? <ul></ul> : <NoListItemIcon />}

			<button type="button" className={loadMoreReviewBtn}>
				<span>리뷰 더 읽기</span>
				<ChevronDownDoubleIcon />
			</button>
		</>
	);
}
