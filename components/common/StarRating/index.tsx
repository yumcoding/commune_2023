"use client";
import styles from "./styles.module.scss";

interface PropsTypes {
	rating: number;
	setRating: React.Dispatch<React.SetStateAction<number>>;
}

export default function StarRating({ rating, setRating }: PropsTypes) {
	const onChangeRating = (e: React.ChangeEvent<HTMLInputElement>) => setRating(+e.target.value);

	return (
		<>
			<div className={styles.rate}>
				{[1, 2, 3, 4, 5].map((item) => (
					<>
						<input type="radio" id={`star${item}`} name="rate" value={item} checked={rating === item} onChange={onChangeRating} />
						<label htmlFor={`star${item}`} title="text"></label>
					</>
				))}
			</div>
		</>
	);
}
