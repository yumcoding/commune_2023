import { ReviewWithLikes } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import ReviewContent from "@/components/book/ReviewItem/ReviewContent";
import { DeleteIcon, OutlineThumbUpIcon, PencilIcon } from "@/assets/icons";
import { cls } from "@/lib/front/cls";
import StarRatingUI from "@/components/common/StarRatingUI";

export default function UserReviewItem(props: { review: ReviewWithLikes }) {
	const { item, metaWrapper, infoWrapper, heading, desc, bookInfo, reviewInfo, likesNum, statWrapper, btnGroup } = styles;
	const {
		id,
		updatedAt,
		title,
		content,
		rating,
		bookAuthor,
		bookImage,
		bookIsbn,
		bookTitle,
		_count: { likes },
	} = props.review;
	return (
		<li className={item}>
			<div className={metaWrapper}>
				<Link href={`/book/${bookIsbn}`}>
					<Image src={bookImage} alt={`${bookTitle} 커버 이미지`} width={100} height={146} />
				</Link>

				<div className={infoWrapper}>
					<Link href={`/book/${bookIsbn}`}>
						<div className={bookInfo}>
							<h3 className={heading}>{bookTitle}</h3>
							<p className={desc}>{bookAuthor}</p>
						</div>
					</Link>

					<div className={reviewInfo}>
						<div>
							<h2 className={heading}>{title}</h2>

							<p className={desc}>{updatedAt.toString().slice(0, 10).replaceAll("-", ".")}</p>

							<div className={statWrapper}>
								<StarRatingUI rating={rating || 0} />
								<p className={likesNum}>
									<OutlineThumbUpIcon />
									<small>({likes})</small>
								</p>
							</div>
						</div>

						<div className={btnGroup}>
							<Link href={`/book/${bookIsbn}/write-review`} aria-label="리뷰 수정하기">
								<PencilIcon />
							</Link>
						</div>
					</div>
				</div>
			</div>

			<ReviewContent content={content} />
		</li>
	);
}
