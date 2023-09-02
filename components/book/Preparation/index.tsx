import { BeakerIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
export default function Preparation() {
	const { wrapper,text } = styles;
	return (
		<>
			<div className={wrapper}>
				<BeakerIcon />
				<div className={text}>
					<p>한 줄 기대평은</p>
					<p>2차 배포에 포함 예정이예요.</p>
					<p>조금만 기다려주세요 😉 </p>
				</div>
			</div>
		</>
	);
}
