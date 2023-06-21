// 메타데이터?

"use client";
import { ChevronDownDoubleIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import ButtonGroup from "@/components/book/ButtonGroup";
import Divider from "@/components/common/Layout/Divider";
import { cls } from "@/lib/front/cls";
import CommentForm from "@/components/book/CommentForm";
import CommentItem from "@/components/book/CommentItem";
import CartLink from "@/components/book/CartLink";
import ReviewSection from "@/components/book/ReviewSection";

// export async function generateStaticParams() {
// 	// const posts = await fetch("https://.../posts").then((res) => res.json());
// 	// return posts.map((post) => ({
// 	// 	slug: post.slug,
// 	// }));
// }

//

export default function Page({ params }: { params: { isbn: string } }) {
	const { main, section, bookWrapper, book, bookInfo, bookImg, sectionContentWrapper, summary, loadMoreReviewBtn } = styles;

	return (
		<main className={main}>
			{/* 상단 버튼 nav */}
			<ButtonGroup />

			<div className={bookWrapper}>
				<div className={book}>
					<div className={bookImg}></div>
					<div className={bookInfo}>
						<h1>책 제목</h1>
						<p>작가 | 출판사 | 출간일</p>
					</div>
				</div>
			</div>

			<section className={cls(section, summary)}>
				<div className={sectionContentWrapper}>
					<h2>책 소개</h2>
					<p>
						모든 국민은 학문과 예술의 자유를 가진다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 국회는 국민의 보통·평등·직접·비밀선거에 의하여 선출된 국회의원으로 구성한다. 누구든지
						병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다. 모든 국민은 보건에 관하여 국가의 보호를 받는다. 국무위원은 국무총리의 제청으로 대통령이 임명한다. 헌법재판소는 법관의 자격을 가진
						9인의 재판관으로 구성하며, 재판관은 대통령이 임명한다. 모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과 조건을 민주주의원칙에 따라 법률로 정한다. 혼인과 가족생활은 개인의 존엄과
						양성의 평등을 기초로 성립되고 유지되어야 하며, 국가는 이를 보장한다.
					</p>
				</div>
			</section>
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
