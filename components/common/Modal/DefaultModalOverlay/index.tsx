import styles from "../styles.module.scss";
import useBodyScrollBlocking from "@/hooks/useBodyScrollBlocking";

export default function DefaultModalOverlay({ onClickOverlay, children }: { onClickOverlay: React.MouseEventHandler<HTMLDivElement>; children: React.ReactNode }) {
	useBodyScrollBlocking();

	return (
		<div className={styles.modal} onClick={onClickOverlay}>
			<div onClick={(e) => e.stopPropagation()}>{children}</div>
		</div>
	);
}
