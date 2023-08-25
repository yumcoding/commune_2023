// 메타데이터?
import ButtonGroup from "@/components/book/ButtonGroup";
import Divider from "@/components/common/Layout/Divider";
import CommentForm from "@/components/book/CommentForm";
import CommentItem from "@/components/book/CommentItem";
import CartLink from "@/components/book/CartLink";
import ReviewSection from "@/components/book/ReviewSection";
import BookInfo from "../../../components/book/BookInfo/index";
import { ChevronDownDoubleIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import MyReviewSection from "@/components/book/MyReviewSection";

export default function Page() {
	const { main, section, loadMoreReviewBtn } = styles;

	return (
		<main className={main}>
			{/* 상단 버튼 nav */}
			<ButtonGroup />

			<BookInfo />
			
			<Divider />

			<section className={section}>
				<MyReviewSection />
			</section>

			{/* 사용자 리뷰 */}
			<section className={section}>
				<ReviewSection />
			</section>

			<Divider />

			{/* 짧은 리뷰 */}
			<section className={section}>
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
			</section>

			{/* aside 버튼 - smHidden */}
			<aside>
				<CartLink />
			</aside>
		</main>
	);
}
