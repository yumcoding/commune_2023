import Nav from "@/components/book/library/Nav";
import styles from "./styles.module.scss";
import BookSwiper from "@/components/common/BookSwiper";

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
				<h1>
					작성한 리뷰 <small>(527)</small>
				</h1>
				<BookSwiper hasShowMore={true} />
			</section>
		</main>
	);
}
