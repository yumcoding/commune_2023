import styles from "./styles.module.scss";
import { LoginIcon } from "@/assets/icons";

interface propsTypes {
	title: string;
	name: string | null;
	image: string | null;
	updatedAt: Date;
}
export default function ReviewWriter(props: propsTypes) {
	const { reviewWriter, writerAvatar, writerInfo, reviewTitle, flexboxBetween, flexbox, author, date, rating } = styles;
	const { title, name, image, updatedAt } = props;
	return (
		<>
			<div className={reviewWriter}>
				<div className={writerAvatar}>
					{/* TODO : 사용자 아바타  */}
					<LoginIcon />
				</div>

				<div className={writerInfo}>
					<h3 className={reviewTitle}>{title}</h3>

					<div className={flexboxBetween}>
						<div className={flexbox}>
							<strong className={author}>{name || "익명의 꼬뮤니"}</strong>
							<small className={date}>{updatedAt.toString().slice(0, 10).replaceAll("-", ".")}</small>
						</div>
						{/* TODO : 책 별점 */}
						{/* <div className={cls(flexbox, rating)}>
          <SolidStarIcon />
          <SolidStarIcon />
          <SolidStarIcon />
          <SolidStarIcon />
          <OutlineStarIcon />
        </div> */}
					</div>
				</div>
			</div>
		</>
	);
}
