import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";

export default function Loader() {
	return (
		<div className={cls(styles.box)}>
			<div className={styles.loader}></div>
		</div>
	);
}
