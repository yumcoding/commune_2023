import { ChevronRightIcon, LoginIcon } from "@/assets/icons";
import Link from "next/link";
import styles from "./styles.module.scss";
import Nav from "@/components/book/library/Nav";
export default function Page() {
	const { main, userInfoSection, userInfoBg, userInfo, avatarContainer, avatarImg, changeBtn, userName, staticRow, staticItem, reviewSection } = styles;

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
						<h1 className={userName}>사용자이름</h1>
						<dl>
							<div className={staticRow}>
								<div className={staticItem}>
									<dt>작성 리뷰</dt>
									<dd>524</dd>
								</div>
								<div className={staticItem}>
									<dt>좋아요 받은 리뷰</dt>
									<dd>57</dd>
								</div>
							</div>
							<div className={staticRow}>
								<div className={staticItem}>
									<dt>작성 한줄평</dt>
									<dd>1920</dd>
								</div>
								<div className={staticItem}>
									<dt>좋아요 받은 한줄평</dt>
									<dd>557</dd>
								</div>
							</div>
						</dl>
					</div>
				</div>
			</section>

			{/*  */}
			<section className={reviewSection}>
				<h1>
					작성한 리뷰 <small>(524)</small>
				</h1>
				<button type="button">
					<span>더 보기</span>
					<ChevronRightIcon />
				</button>
				{/* 책 swiper 영역 */}
				{/* <Link href="/">
					<span>리스트 더 보기</span>
					<ChevronRightIcon />
				</Link> */}
			</section>
		</main>
	);
}
