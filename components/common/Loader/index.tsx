import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";

export default function Loader({ isSmall }: { isSmall: boolean }) {
	const { box, small, loader } = styles;

	return (
		<div className={isSmall ? cls(box, small) : box}>
			<div className={loader}></div>
		</div>
	);
}
