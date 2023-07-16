import Book from "@/components/common/Book";
import styles from "./styles.module.scss";
import { ItemTypes } from "../SearchResultSection";

export default function SearchResultList(props: { items: ItemTypes[] }) {
	const { wrapper, list } = styles;
	return (
		<div className={wrapper}>
			<ul className={list}>
				{props.items.map((item) => {
					return (
						<li key={item.isbn}>
							<Book item={item} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}
