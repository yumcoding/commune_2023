import { BookIdeaIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function ShowMoreBookSlide() {
	const { wrapper } = styles;
	return (
		<div className={wrapper}>
			<button type="button">
				<BookIdeaIcon />
				<span>더보기</span>
			</button>
		</div>
	);
}
