import styles from "./styles.module.scss";

export default function ListLoading() {
	const { list, bookImg, bookDesc } = styles;

	return (
		<ul className={list}>
			{Array.from({ length: 5 }).map((_, i) => (
				<li key={`loader{i}`}>
					<div className={bookImg} />
					<div className={bookDesc} />
				</li>
			))}
		</ul>
	);
}
