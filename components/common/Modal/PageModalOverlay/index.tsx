"use client";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "../styles.module.scss";
import useBodyScrollBlocking from "@/hooks/useBodyScrollBlocking";

export default function PageModalOverlay({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const onClickClose = () => router.back();

	useBodyScrollBlocking();

	return (
		<div className={styles.modal} onClick={onClickClose}>
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</div>
	);
}
