import { StarFullIcon, StarHalfIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { cls } from "@/lib/front/cls";

export default function StarRating() {
	const { ratingGroup, ratingIcon, ratingInput, ratingLabel, ratingLabelHalf, ratingIconStar, ratingInputNone } = styles;

	return (
		<div className={ratingGroup}>
			<input className={cls(ratingInput, ratingInputNone)} checked name="rating2" id="rating2-0" value="0" type="radio" />
			<label aria-label="0 stars" className={ratingLabel} htmlFor="rating2-0"></label>

			<label aria-label="1 star" className={ratingLabel} htmlFor="rating2-10">
				<span className={cls(ratingIcon, ratingIconStar)}>
					<StarFullIcon />
				</span>
			</label>
			<input className={ratingInput} name="rating2" id="rating2-10" value="1" type="radio" />

			<label aria-label="2 stars" className={ratingLabel} htmlFor="rating2-20">
				<span className={cls(ratingIcon, ratingIconStar)}>
					<StarFullIcon />
				</span>
			</label>
			<input className={ratingInput} name="rating2" id="rating2-20" value="2" type="radio" />

			<label aria-label="3 stars" className={ratingLabel} htmlFor="rating2-30">
				<span className={cls(ratingIcon, ratingIconStar)}>
					<StarFullIcon />
				</span>
			</label>
			<input className={ratingInput} name="rating2" id="rating2-30" value="3" type="radio" />

			<label aria-label="4 stars" className={ratingLabel} htmlFor="rating2-40">
				<span className={cls(ratingIcon, ratingIconStar)}>
					<StarFullIcon />
				</span>
			</label>
			<input className={ratingInput} name="rating2" id="rating2-40" value="4" type="radio" />

			<label aria-label="5 stars" className={ratingLabel} htmlFor="rating2-50">
				<span className={cls(ratingIcon, ratingIconStar)}>
					<StarFullIcon />
				</span>
			</label>
			<input className={ratingInput} name="rating2" id="rating2-50" value="5" type="radio" />
		</div>
	);
}
