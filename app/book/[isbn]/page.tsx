// 메타데이터?
import ButtonGroup from "@/components/book/ButtonGroup";
import Divider from "@/components/common/Layout/Divider";
import CommentForm from "@/components/book/CommentForm";
import CommentItem from "@/components/book/CommentItem";
import CartFloatingLink from "@/components/book/CartFloatingLink";
import ReviewSection from "@/components/book/ReviewSection";
import BookInfo from "../../../components/book/BookInfo/index";
import { ChevronDownDoubleIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import MyReviewSection from "@/components/book/MyReviewSection";
import Preparation from "@/components/book/Preparation";
import BackFloatingBtn from "@/components/book/BackFloatingBtn";

export default function Page() {
	const { main, section, loadMoreReviewBtn, preparation } = styles;

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
				<div className={preparation}>
					<h2>
						기대평<small>(127)</small>
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
				<Preparation />
			</section>

			{/* aside 버튼 - smHidden */}
			<aside>
				<CartFloatingLink />
				<BackFloatingBtn/>
			</aside>
		</main>
	);
}
