import { LoginIcon, OutlineHeartIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function CommentItem() {
	const { commentItem, avatar, userName, date, comment, heartBtnWrapper } = styles;
	return (
		<>
			<li className={commentItem}>
				<div className={avatar}>
					<LoginIcon />
				</div>

				<div>
					<div>
						<strong className={userName}>이름에게</strong>
						<small className={date}>2023.06.24</small>
					</div>
					<p className={comment}>언론·출판은 타인의 명예나 권리 또는 공중도덕이나 사회윤리를 침해하여서는 아니된다.</p>
					<div className={heartBtnWrapper}>
						<button type="button">
							<OutlineHeartIcon />
						</button>
						<small>(55)</small>
					</div>
				</div>
			</li>
		</>
	);
}
