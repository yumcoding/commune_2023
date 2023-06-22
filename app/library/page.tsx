import { ChevronRightIcon, LoginIcon } from "@/assets/icons";
import Link from "next/link";
import styles from "./styles.module.scss";
import Nav from "@/components/book/library/Nav";
export default function Page() {
	const { main, userInfoSection, userInfoBg, userInfo, avatarContainer, avatarImg, changeBtn, userName, statList, statItem, reviewSection } = styles;

	return (
		<main className={main}>
			<Nav />
			{/*  */}
			<section className={userInfoSection}>
				<div className={userInfoBg} />

				<div className={userInfo}>
					<div className={avatarContainer}>
						<div className={avatarImg}>{/* <LoginIcon /> */}</div>
						<button type="button" className={changeBtn}>
							사진 변경
						</button>
					</div>

					<div>
						<h1 className={userName}>달달한 초코칩</h1>
						<ul className={statList}>
							<li className={statItem}>
								<h3>리뷰</h3>
								<strong>527</strong>
								<p>
									좋아요<small>535</small>
								</p>
							</li>
							<li className={statItem}>
								<h3>한줄평</h3>
								<strong>1920</strong>
								<p>
									좋아요<small>777</small>
								</p>
							</li>
						</ul>
					</div>
				</div>
			</section>

			<section className={reviewSection}>
				<div>
					<h1>
						작성한 리뷰 <small>(524)</small>
					</h1>
					<button type="button">
						<span>더 보기</span>
						<ChevronRightIcon />
					</button>
				</div>

				{/* 책 swiper 영역 */}
				<Link href="/">
					<span>리스트 더 보기</span>
					<ChevronRightIcon />
				</Link>
			</section>
		</main>
	);
}
