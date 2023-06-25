import { BookIdeaIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function ShowMoreBookSlide({ onClickMoreReview }: { onClickMoreReview: React.MouseEventHandler<HTMLButtonElement> }) {
	const { moreSlide, text } = styles;
	return (
		<>
			<button type="button" className={moreSlide} onClick={onClickMoreReview}>
				<span>
					<BookIdeaIcon />
					<span className={text}>더보기</span>
				</span>
			</button>
		</>
	);
}
