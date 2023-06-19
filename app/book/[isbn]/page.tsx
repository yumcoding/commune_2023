// 메타데이터?

import { CartIcon, ChevronUpIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import ButtonGroup from "@/components/book/ButtonGroup";

// export async function generateStaticParams() {
// 	// const posts = await fetch("https://.../posts").then((res) => res.json());
// 	// return posts.map((post) => ({
// 	// 	slug: post.slug,
// 	// }));
// }

export default function Page({ params }: { params: { isbn: string } }) {
	const { main, bookWrapper, book, bookInfo, bookImg, content, summary } = styles;

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

			<section className={summary}>
				<div className={content}>
					<h2>책 소개</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae excepturi cumque dignissimos et nulla minima animi incidunt aliquam laborum, repudiandae ab? Odio officia at dolores
						consequuntur laboriosam ipsa itaque neque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nisi optio eos! Corrupti eaque voluptas id nemo expedita, aliquam
						perspiciatis, repudiandae ipsum beatae iusto quidem provident itaque laboriosam saepe deserunt!
					</p>
				</div>
			</section>

			{/* 사용자 리뷰 */}
			<section>
				<div className={content}>
					<h2>리뷰</h2>
					<ul></ul>
				</div>
			</section>

			{/* 짧은 코멘트 달기 */}
			<form>
				<textarea></textarea>
				<button type="submit">등록</button>
			</form>

			{/* aside 버튼 - smHidden */}
			<aside>
				<button type="button">
					<CartIcon />
				</button>
				<button type="button">
					<ChevronUpIcon />
				</button>
			</aside>
		</main>
	);
}
