import { ReviewWithUser } from "@/types/db";
import styles from "./styles.module.scss";
import ReviewWriter from "./ReviewWriter";
import ReviewContent from "./ReviewContent";
import IsLikedBtn from "./IsLikedBtn";

export default function ReviewItem(props: { review: ReviewWithUser }) {
	const { reviewItem } = styles;

	const {
		id,
		user: { name, image },
		updatedAt,
		title,
		content,
		rating,
	} = props.review;

	return (
		<>
			<li className={reviewItem}>
				<ReviewWriter title={title} name={name} image={image} updatedAt={updatedAt} rating={rating} />
				<ReviewContent content={content} />
				<IsLikedBtn reviewId={id} />
			</li>
		</>
	);
}
