// 메타데이터?

import { CartIcon, ChevronUpIcon, OutlineHeartIcon, OutlineStarIcon, SolidStarIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import ButtonGroup from "@/components/book/ButtonGroup";
import Divider from "@/components/common/Layout/Divider";
import { cls } from "@/lib/front/cls";

// export async function generateStaticParams() {
// 	// const posts = await fetch("https://.../posts").then((res) => res.json());
// 	// return posts.map((post) => ({
// 	// 	slug: post.slug,
// 	// }));
// }

export default function Page({ params }: { params: { isbn: string } }) {
	const { main, section, bookWrapper, book, bookInfo, bookImg, sectionContentWrapper, summary } = styles;

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
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae excepturi cumque dignissimos et nulla minima animi incidunt aliquam laborum, repudiandae ab? Odio officia at dolores
						consequuntur laboriosam ipsa itaque neque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos nisi optio eos! Corrupti eaque voluptas id nemo expedita, aliquam
						perspiciatis, repudiandae ipsum beatae iusto quidem provident itaque laboriosam saepe deserunt!
					</p>
				</div>
			</section>
			<Divider />
			{/* 사용자 리뷰 */}
			<section className={section}>
				<div className={sectionContentWrapper}>
					<h2>리뷰</h2>
					<button type="button">쓰기</button>
					<ul>
						<li>
							<div>
								<div>img</div>
								<div>
									<h4>쫀득초코</h4>
									<p>2023-05-05</p>
								</div>
								<div>
									<SolidStarIcon />
									<SolidStarIcon />
									<SolidStarIcon />
									<SolidStarIcon />
									<OutlineStarIcon />
								</div>
							</div>
							<p>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed ducimus id eveniet perspiciatis, corporis velit exercitationem commodi tempore quibusdam quas eos recusandae.
								Reprehenderit illum asperiores natus ipsa! Consectetur, corporis fuga. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor quae rem dicta totam ratione natus ut eos
								recusandae reiciendis provident, asperiores debitis inventore magni perspiciatis aspernatur quas numquam? Nihil, quibusdam.
							</p>
							<button type="button">더보기</button>
							<div>
								<button type="button">
									<OutlineHeartIcon />
								</button>
							</div>
						</li>
					</ul>
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
