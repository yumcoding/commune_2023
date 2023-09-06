"use client";
import { useState } from "react";
import { cls } from "@/lib/front/cls";
import { ChevronDownIcon, ChevronUpIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

interface propsTypes {
	content: string;
}

export default function ReviewContent(props: propsTypes) {
	const { flexbox, reviewText, moreText, btnWrapper, showMoreBtn, isShort } = styles;
	const { content } = props;

	const [showMore, setShowMore] = useState(false);
	const toggleShowMore = () => setShowMore((prev) => !prev);

	return (
		<>
			<div className={cls(reviewText, showMore ? moreText : "")}>
				<p>{content}</p>
			</div>
			<div className={btnWrapper}>
				<button type="button" onClick={toggleShowMore} className={cls(flexbox, showMoreBtn, content.length > 70 ? "" : isShort)}>
					{showMore ? (
						<>
							접기
							<ChevronUpIcon />
						</>
					) : (
						<>
							펼쳐보기
							<ChevronDownIcon />
						</>
					)}
				</button>
			</div>
		</>
	);
}
