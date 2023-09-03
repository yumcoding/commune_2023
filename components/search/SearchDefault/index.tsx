import { SearchDefaultIcon } from "@/assets/icons";
import styles from "./styles.module.scss";

export default function SearchDefault() {
	const { wrapper } = styles;
	return (
		<div className={wrapper}>
			<SearchDefaultIcon />
			<p>관심 있는 책이나 작가, 출판사를 검색해 봐요 :) </p>
		</div>
	);
}
