import Link from "next/link";
import { CloseMarkIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import Book from "@/components/common/Book";
import Divider from "@/components/common/Layout/Divider";

export default function MoreReviewModalContent() {
	const { wrapper, header, scrollWrapper, closeBtn, bookList, bookItem, loadMoreReviewBtn } = styles;

	return (
		<>
			<section className={wrapper}>
				<header className={header}>
					<h1>
						작성 리뷰 <small>(527)</small>
					</h1>

					<button type="button" className={closeBtn}>
						<CloseMarkIcon />
					</button>
				</header>

				<div className={scrollWrapper}>
					<ul className={bookList}>
						{[0, 1, 2, 3, 4, 5].map((item, i) => (
							<li key={`review${i}`}>
								<Book />
							</li>
						))}
					</ul>
				</div>

				{/* 리뷰 infinite scroll */}
			</section>
		</>
	);
}
