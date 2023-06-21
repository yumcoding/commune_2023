"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, CloseMarkIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { cls } from "@/lib/front/cls";

export default function ReviewWriteModalContent({ isModal }: { isModal: boolean }) {
	const { wrapper, isPage, header, closeBtn, saveBtn, saveActive, formWrapper, counter, backBtn } = styles;

	const router = useRouter();
	const onClickClose = () => router.back();

	const [review, setReview] = useState("");
	const onChangeReview = (e: React.ChangeEvent<HTMLTextAreaElement>) => setReview(e.target.value);
	return (
		<>
			<section className={cls(wrapper, isModal ? "" : isPage)}>
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
				<button type="button" className={backBtn} onClick={onClickClose}>
					<ChevronLeftIcon/>
					뒤로가기
				</button>
			</section>
		</>
	);
}
