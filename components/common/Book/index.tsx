import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import { SwiperItemTypes } from "../BookSwiper";

export default function Book(props: { item: SwiperItemTypes }) {
	const { book, bookImg, bookDesc } = styles;
	const { bookIsbn, bookImage, bookTitle, bookAuthor } = props.item;
	return (
		<>
			<div className={book}>
				<Link href={`/book/${bookIsbn}`}>
					<div className={bookImg}>
						<Image src={bookImage} alt={`${bookTitle} 책 표지`} fill sizes="33vw" priority />
					</div>
				</Link>

				<div className={bookDesc}>
					<Link href={`/book/${bookIsbn}`}>
						<h3>{bookTitle}</h3>
						<div>
							<strong>{bookAuthor.replaceAll("^", ", ")}</strong>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}
