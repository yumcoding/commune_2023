import React from "react";
import styles from "./styles.module.scss";

interface OverlayPropTypes {
	onClick: React.MouseEventHandler<HTMLElement>;
	children: React.ReactNode;
}

export default function ModalOverlay({ onClick, children }: OverlayPropTypes) {
	return (
		<div className={styles.modal} onClick={onClick}>
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</div>
	);
}
