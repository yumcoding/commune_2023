import { UserDefaultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function CommentForm() {
	const { wrapper, avatar, form, textarea, submitBtn } = styles;
	return (
		<div className={wrapper}>
			<div className={avatar}>
				<UserDefaultIcon />
			</div>
			<form className={form}>
				<textarea className={textarea}></textarea>
				<button type="submit" className={submitBtn}>
					등록
				</button>
			</form>
		</div>
	);
}
