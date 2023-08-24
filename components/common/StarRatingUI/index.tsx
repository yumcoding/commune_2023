import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";
import { SolidStarIcon } from "@/assets/icons";

export default function StarRatingUI({ rating }: { rating: number }) {
	const { flexbox, star, noData } = styles;

	return (
		<div className={cls(flexbox, star, rating === 0 ? noData : "")}>
			{Array.from({ length: rating === 0 ? 5 : rating }).map((_, i) => (
				<SolidStarIcon key={i} />
			))}
		</div>
	);
}
