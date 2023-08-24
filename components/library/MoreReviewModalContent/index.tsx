import { CloseMarkIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import Book from "@/components/common/Book";

export default function MoreReviewModalContent({ onClickClose }: { onClickClose: React.MouseEventHandler<HTMLButtonElement> }) {
	const { wrapper, header, closeBtn, scrollWrapper, bookList } = styles;

	return (
		<>
			<section className={wrapper}>
				<header className={header}>
					<h1>
						작성 리뷰 <small>(527)</small>
					</h1>

					<button type="button" className={closeBtn} onClick={onClickClose}>
						<CloseMarkIcon />
					</button>
				</header>

				{/* 책 리스트 있을 때  */}
				<div className={scrollWrapper}>
					<ul className={bookList}>
						{[0, 1, 2, 3, 4, 5].map((item, i) => (
							<li key={`review${i}`}>
								{/* <Book /> */}
							</li>
						))}
					</ul>
				</div>

				{/* 리뷰 infinite scroll */}
			</section>
		</>
	);
}
