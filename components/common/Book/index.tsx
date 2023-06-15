import Link from "next/link";
import styles from "./styles.module.scss";

export default function Book() {
	const { book, bookImg, bookDesc } = styles;
	return (
		<>
			<div className={book}>
				<Link href="/">
					<div className={bookImg}>
						<div>{/* 이미지 */}</div>
						{/* 순위 표시 */}
					</div>
				</Link>

				<div className={bookDesc}>
					<Link href="/">
						<h3>책 이름</h3>
						<div>
							<strong>저자, 옮긴이dd ddddddd ddddddddd ddddddddddddddddddddddddddddddddd d dddddddd dddddddd ddddddddd dd ddddddddddddddddd</strong>
							<span> | 출판사</span>
						</div>
					</Link>
				</div>
			</div>
		</>
	);
}
