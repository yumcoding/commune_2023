"use client";
import { useSession } from "next-auth/react";
import styles from "./styles.module.scss";
import { LoginIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";

export default function UserInfoSection() {
	const { userInfoSection, userInfoBg, userInfo, avatarContainer, avatarImg, changeBtn, userName, statList, statItem } = styles;
	const session = useSession();

	const router = useRouter();
	if (session.status === "unauthenticated") {
		router.replace("/");
	}

	const name = session.status === "loading" ? "" : session?.data?.user?.name ? session.data.user.name : "익명의 꼬뮤니";
	return (
		<section className={userInfoSection}>
			<div className={userInfoBg} />

			{/* TODO : 사용자 이름, 아바타 변경은 2차 개발 */}
			<div className={userInfo}>
				<div className={avatarContainer}>
					<div className={avatarImg}>{/* <LoginIcon /> */}</div>
					{/* <button type="button" className={changeBtn}>
						사진 변경
					</button> */}
				</div>

				<div>
					<h1 className={userName}>{name}</h1>
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
	);
}
