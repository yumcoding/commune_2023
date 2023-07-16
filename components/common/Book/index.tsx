import Link from "next/link";
import styles from "./styles.module.scss";
import { ItemTypes } from "@/components/search/SearchResultSection";

// TODO 1
// href 두 군데 넣어주어야 한다.

// TODO 2
// href에 넣어주는 값이 책 상세 페이지인지 리뷰인지 구분
// props로 detail인지 review인지 구분해서
// ? '/book/isbn'으로 갈지 '/review'로 갈지 구분하는 방법

export default function Book(props: { item: ItemTypes }) {
	const { book, bookImg, bookDesc } = styles;
	const { isbn, image, title, author, publisher } = props.item;
	return (
		<>
			<div className={book}>
				<Link href={`/book/${isbn}`}>
					<div className={bookImg}>
						<div>{/* 이미지 */}</div>
						{/* 순위 표시 */}
					</div>
				</Link>

				<div className={bookDesc}>
					<Link href={`/book/${isbn}`}>
						<h3>{title}</h3>
						<div>
							<strong>{author.replaceAll("^", ", ")}</strong>
							<span> | {publisher}</span>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}
