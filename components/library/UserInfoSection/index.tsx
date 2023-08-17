"use client";
import useSWR from "swr";
import styles from "./styles.module.scss";
import {  UserDefaultIcon } from "@/assets/icons";
import { fetcher } from "@/lib/front/fetchers";
import showCount from "@/lib/front/showCount";
import { UserInfoTypes } from "@/types/db";

export default function UserInfoSection() {
	const { userInfoSection, userInfoBg, userInfo, avatarContainer, avatarImg, changeBtn, userName, statList, statItem } = styles;

	const { data } = useSWR<UserInfoTypes>(`/api/user/profile`, fetcher);

	return (
		<section className={userInfoSection}>
			<div className={userInfoBg} />

			{/* TODO : 사용자 이름, 아바타 변경은 2차 개발 */}
			<div className={userInfo}>
				<div className={avatarContainer}>
					<div className={avatarImg}>
						<UserDefaultIcon />
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
							<strong>{data?.user?._count?.reviews ? showCount(data?.user?._count?.reviews) : "-"}</strong>
							<p>
								좋아요&nbsp;<small>{data?.user?._count?.likes ? showCount(data?.user?._count?.likes) : "-"}</small>
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
