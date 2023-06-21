"use client";
import PageModalOverlay from "@/components/common/Modal/PageModalOverlay";
import styles from "./styles.module.scss";
import { CloseMarkIcon } from "@/assets/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cls } from "@/lib/front/cls";
export default function WriteReview() {
	const { wrapper, header, closeBtn, saveBtn, saveActive, formWrapper, counter } = styles;

	const router = useRouter();
	const onClickClose = () => router.back();

	const [review, setReview] = useState("");
	const onChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value);
	return (
		<PageModalOverlay>
			<section className={wrapper}>
				<header className={header}>
					<h1>책 이름이 들어가요 :) </h1>
					<button type="button" className={closeBtn} onClick={onClickClose}>
						<CloseMarkIcon />
					</button>
				</header>
				<div className={formWrapper}>
					<form>
						<input type="text" placeholder="리뷰 제목" />
						<textarea placeholder="자유롭게" value={review} onChange={onChangeReview}></textarea>
						<button type="submit" className={cls(saveBtn, review?.length > 0 ? saveActive : "")} disabled={review?.length > 0 ? false : true}>
							저장
						</button>
					</form>
					<p className={counter}>{review?.length} / 1000</p>
				</div>
			</section>
		</PageModalOverlay>
	);
}
