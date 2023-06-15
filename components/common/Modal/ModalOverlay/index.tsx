"use client";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./styles.module.scss";
import useBlockBodyScroll from "@/hooks/useBlockBodyScroll";

export default function ModalOverlay({ children }: { children: React.ReactNode }) {
	const router = useRouter();

	const onClickClose = () => router.back();

	useBlockBodyScroll();

	return (
		<div className={styles.modal} onClick={onClickClose}>
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</div>
	);
}
