"use client";
import { useRouter } from "next/navigation";
import { BulbIcon, CloseMarkIcon } from "@/assets/icons";
import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";

export default function UnderConstructionContent({ isModal }: { isModal: boolean }) {
	const { contentWrapper, modalWrapper, pageWrapper, text, backBtn, backIconBtn } = styles;
	const router = useRouter();
	const onClickClose = () => router.back();
	return (
		<>
			<div className={cls(contentWrapper, isModal ? modalWrapper : pageWrapper)}>
				<BulbIcon />
				<div className={text}>
					<p>준비중입니다.</p>
					<p>조금만 기다려주세요!</p>
				</div>
				<button type="button" className={backBtn} onClick={onClickClose}>
					뒤로가기
				</button>
				{isModal && (
					<button type="button" className={backIconBtn} onClick={onClickClose}>
						<CloseMarkIcon />
					</button>
				)}
			</div>
		</>
	);
}
