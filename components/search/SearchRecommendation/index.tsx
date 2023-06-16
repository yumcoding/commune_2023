import { recentSearch, popularSearch } from "@/assets/mockData";
import styles from "./styles.module.scss";

export default function SearchRecommendation({ isRecent }: { isRecent: Boolean }) {
	const { section, header, delBtn, list } = styles;

	return (
		<section className={section}>
			<header className={header}>
				<h2>{isRecent ? "최근 검색어" : "인기 검색어"}</h2>
				{isRecent && (
					<button type="button" className={delBtn}>
						모두 삭제
					</button>
				)}
			</header>
			{isRecent ? (
				<ul className={list}>
					{recentSearch?.map((item, _) => (
						<li key={item.id}>
							<p>{item.query}</p>
						</li>
					))}
				</ul>
			) : (
				<ul className={list}>
					{popularSearch?.map((item, _) => (
						<li key={item.id}>
							<p>{item.query}</p>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
