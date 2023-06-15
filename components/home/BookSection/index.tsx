import Book from "@/components/common/Book";
import styles from "./styles.module.scss";

interface PropTypes {
	title: string;
}

export default function BookSection({ title }: PropTypes) {
	const { heading, bookList, bookItem } = styles;
	return (
		<section>
			<h2 className={heading}>{title}</h2>
			<ul className={bookList}>
				{[0, 1, 2].map((item, i) => (
					<li key={i} className={bookItem}>
						<Book />
					</li>
				))}
			</ul>
		</section>
	);
}
