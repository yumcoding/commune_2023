"use client";
import { Fragment } from "react";
import styles from "./styles.module.scss";

interface PropsTypes {
	rating: number;
	setRating: React.Dispatch<React.SetStateAction<number>>;
}

export default function StarRatingBtn({ rating, setRating }: PropsTypes) {
	const onChangeRating = (e: React.ChangeEvent<HTMLInputElement>) => setRating(+e.target.value);

	return (
		<>
			<div className={styles.rate}>
				{[5, 4, 3, 2, 1].map((item) => (
					<Fragment key={`star${item}`}>
						<input type="radio" id={`star${item}`} name="rate" value={item} checked={rating === item} onChange={onChangeRating} />
						<label htmlFor={`star${item}`} title="text"></label>
					</Fragment>
				))}
			</div>
		</>
	);
}
