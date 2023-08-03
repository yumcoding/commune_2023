// 메타데이터?
import ButtonGroup from "@/components/book/ButtonGroup";
import Divider from "@/components/common/Layout/Divider";
import CommentForm from "@/components/book/CommentForm";
import CommentItem from "@/components/book/CommentItem";
import CartLink from "@/components/book/CartLink";
import ReviewSection from "@/components/book/ReviewSection";
import BookInfo from "@/components/book/BookInfo";
import { ChevronDownDoubleIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function Page() {
	const { main, section, sectionContentWrapper, loadMoreReviewBtn } = styles;

	return (
		<main className={main}>
			{/* 상단 버튼 nav */}
			<ButtonGroup />
			<BookInfo />
			<Divider />
			{/* 사용자 리뷰 */}
			<section className={section}>
				<div className={sectionContentWrapper}>
					<ReviewSection />
				</div>
			</section>

			<Divider />

			{/* 짧은 리뷰 */}
			<section className={section}>
				<div className={sectionContentWrapper}>
					<h2>
						한줄평<small>(127)</small>
					</h2>
					<ul>
						<CommentItem key={15} />
						<CommentItem key={115} />
						<CommentItem key={25} />
					</ul>
					<button type="button" className={loadMoreReviewBtn}>
						<span>코멘트 더 읽기</span>
						<ChevronDownDoubleIcon />
					</button>
					<CommentForm />
				</div>
			</section>

			{/* aside 버튼 - smHidden */}
			<aside>
				<CartLink />
			</aside>
		</main>
	);
}
