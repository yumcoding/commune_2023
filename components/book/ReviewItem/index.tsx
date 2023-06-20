"use client";

import { ChevronDownIcon, ChevronUpIcon, OutlineHeartIcon, OutlineStarIcon, SolidStarIcon, UserDefaultIcon, LoginIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { cls } from "@/lib/front/cls";
import { useState } from "react";
export default function ReviewItem() {
	const { flexbox, flexboxBetween, reviewItem, authorInfo, avatar, title, author, date, rating, reviewText, moreText, btnWrapper, showMoreBtn, heartBtnWrapper } = styles;
	const [showMore, setShowMore] = useState(false);
	const toggleShowMore = () => setShowMore((prev) => !prev);

	return (
		<li className={reviewItem}>
			{/* ---------------------- */}
			<div className={flexbox}>
				<div className={avatar}>
					<LoginIcon />
				</div>

				<div className={authorInfo}>
					<h3 className={title}>리뷰 제목</h3>

					<div className={flexboxBetween}>
						<div className={flexbox}>
							<strong className={author}>촉촉한 초코칩</strong>
							<small className={date}>2023-06-20</small>
						</div>
						<div className={cls(flexbox, rating)}>
							<SolidStarIcon />
							<SolidStarIcon />
							<SolidStarIcon />
							<SolidStarIcon />
							<OutlineStarIcon />
						</div>
					</div>
				</div>
			</div>

			{/* ---------------------- */}

			<div className={cls(reviewText, showMore ? moreText : "")}>
				<p>
					제1항의 탄핵소추는 국회재적의원 3분의 1 이상의 발의가 있어야 하며, 그 의결은 국회재적의원 과반수의 찬성이 있어야 한다. 다만, 대통령에 대한 탄핵소추는 국회재적의원 과반수의 발의와
					국회재적의원 3분의 2 이상의 찬성이 있어야 한다. 모든 국민은 학문과 예술의 자유를 가진다. 대한민국은 국제평화의 유지에 노력하고 침략적 전쟁을 부인한다. 국회는 국민의 보통·평등·직접·비밀선거에
					의하여 선출된 국회의원으로 구성한다. 누구든지 병역의무의 이행으로 인하여 불이익한 처우를 받지 아니한다. 모든 국민은 보건에 관하여 국가의 보호를 받는다. 국무위원은 국무총리의 제청으로
					대통령이 임명한다. 헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며, 재판관은 대통령이 임명한다. 모든 국민은 근로의 의무를 진다. 국가는 근로의 의무의 내용과 조건을 민주주의원칙에
					따라 법률로 정한다. 혼인과 가족생활은 개인의 존엄과 양성의 평등을 기초로 성립되고 유지되어야 하며, 국가는 이를 보장한다.
				</p>
			</div>

			{/* ---------------------- */}
			<div className={btnWrapper}>
				<button type="button" onClick={toggleShowMore} className={cls(flexbox, showMoreBtn)}>
					{showMore ? (
						<>
							접기
							<ChevronUpIcon />
						</>
					) : (
						<>
							펼쳐보기
							<ChevronDownIcon />
						</>
					)}
				</button>
				<div className={heartBtnWrapper}>
					<button type="button">
						<OutlineHeartIcon />
					</button>
					<span>(999+)</span>
				</div>
			</div>
		</li>
	);
}
