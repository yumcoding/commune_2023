"use client";
import useSWR from "swr";
import styles from "./styles.module.scss";
import { LoginIcon } from "@/assets/icons";
import { fetcher } from "@/lib/front/fetchers";

export default function UserInfoSection() {
	const { userInfoSection, userInfoBg, userInfo, avatarContainer, avatarImg, changeBtn, userName, statList, statItem } = styles;

	const { data } = useSWR(`/api/user/profile`, fetcher);

	const showCount = (count: number) => (count > 999 ? "999+" : count);

	return (
		<section className={userInfoSection}>
			<div className={userInfoBg} />

			{/* TODO : 사용자 이름, 아바타 변경은 2차 개발 */}
			<div className={userInfo}>
				<div className={avatarContainer}>
					<div className={avatarImg}>
						<LoginIcon />
					</div>
					{/* <button type="button" className={changeBtn}>
						사진 변경
					</button> */}
				</div>

				<div>
					<h1 className={userName}>{data?.user?.name}</h1>
					<ul className={statList}>
						<li className={statItem}>
							<h3>리뷰</h3>
							<strong>{showCount(data?.user?._count?.reviews)}</strong>
							<p>
								좋아요&nbsp;<small>{showCount(data?.user?._count?.likes)}</small>
							</p>
						</li>
						<li className={statItem}>
							<h3>기대평</h3>
							<strong>2차</strong>
							<p>
								개발 예정 🚀
								{/* <small>777</small> */}
							</p>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
