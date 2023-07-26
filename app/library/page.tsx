import Nav from "@/components/library/Nav";
import styles from "./styles.module.scss";
import BookSwiper from "@/components/common/BookSwiper";
import { NoListItemIcon } from "@/assets/icons";




// auth 이용 -> user info get -> server data fetching한 내용 보여주기


export default function Page() {
	const { main, userInfoSection, userInfoBg, userInfo, avatarContainer, avatarImg, changeBtn, userName, statList, statItem, reviewSection, noItem } = styles;

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
				{/* 작성한 책 리뷰 없을 때  */}
				<div className={noItem}>
					<NoListItemIcon />
					<p>아직 작성한 리뷰가 없어요.</p>
				</div>
				{/* 작성한 책 리뷰 있을 때  */}
				{/* <BookSwiper hasShowMore={true} /> */}
			</section>
		</main>
	);
}
