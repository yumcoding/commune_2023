import { BookIdeaIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function ShowMoreBookSlide() {
	const { moreSlide, text } = styles;
	return (
		<>
			<button type="button" className={moreSlide}>
				<span>
					<BookIdeaIcon />
					<span className={text}>더보기</span>
				</span>
			</button>
		</>
	);
}
