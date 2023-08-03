"use client";

import { useEffect } from "react";
import styles from "./styles.module.scss";
import { cls } from "@/lib/front/cls";
interface PropsTypes {
	isToastVisible: boolean;
	setIsToastVisible: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
}

const ToastPopup = ({ isToastVisible, setIsToastVisible, children }: PropsTypes) => {
	const { toastWrapper, isVisible } = styles;

	useEffect(() => {
		if (!isToastVisible) return;
		let timer: ReturnType<typeof setTimeout>;
		if (isToastVisible) {
			timer = setTimeout(() => {
				setIsToastVisible(false);
			}, 2700);
		}
		return () => clearTimeout(timer);
	}, [isToastVisible, setIsToastVisible]);

	return (
		<>
			<div className={cls(toastWrapper, isToastVisible ? isVisible : "")}>{children}</div>
		</>
	);
};

export default ToastPopup;
