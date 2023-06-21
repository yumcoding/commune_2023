import { BulbIcon, CloseMarkIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function UnderConstructionContent({ onClickClose }: { onClickClose: React.MouseEventHandler<HTMLButtonElement> }) {
	const { contentWrapper, text, backBtn, backIconBtn } = styles;

	return (
		<>
			<div className={contentWrapper}>
				<BulbIcon />
				<div className={text}>
					<p>준비중입니다.</p>
					<p>조금만 기다려주세요!</p>
				</div>
				<button type="button" className={backBtn} onClick={onClickClose}>
					닫기
				</button>
				<button type="button" className={backIconBtn} onClick={onClickClose}>
					<CloseMarkIcon />
				</button>
			</div>
		</>
	);
}
