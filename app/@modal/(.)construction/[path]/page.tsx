"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ModalOverlay from "@/components/common/Modal/ModalOverlay";
import { BulbIcon, CloseMarkIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import useBlockBodyScroll from "@/hooks/useBlockBodyScroll";

export default function Page() {
	const router = useRouter();

	const onClickClose = () => router.back();

	useBlockBodyScroll();

	return (
		<ModalOverlay onClick={onClickClose}>
			<div className={styles.contentWrapper}>
				<div>
					<BulbIcon />
					<div className={styles.text}>
						<p>준비중입니다.</p>
						<p>조금만 기다려주세요!</p>
					</div>
				</div>

				<button type="button" className={styles.closeBtn} onClick={onClickClose}>
					닫기
				</button>
				<button type="button" className={styles.closeIconBtn} onClick={onClickClose}>
					<CloseMarkIcon />
				</button>
			</div>
		</ModalOverlay>
	);
}
