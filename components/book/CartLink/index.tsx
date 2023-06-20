import { CartIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
export default function CartLink() {
	return (
		<div className={styles.cart}>
			<a href="/" target="_blank">
				<CartIcon />
			</a>
		</div>
	);
}
