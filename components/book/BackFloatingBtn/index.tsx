"use client";

import { ArrowLeftIcon } from "@/assets/icons";
import { useRouter } from "next/navigation";
import styles from "./styles.module.scss";

export default function BackFloatingBtn() {
	const router = useRouter();

	return (
		<>
			<div className={styles.btn}>
				<button type="button" aria-label="뒤로 가기" onClick={() => router.back()}>
					<ArrowLeftIcon />
				</button>
			</div>
		</>
	);
}
