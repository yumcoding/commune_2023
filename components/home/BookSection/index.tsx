import styles from "./styles.module.scss";
import BookSwiper from "@/components/common/BookSwiper";

interface PropTypes {
	title: string;
}

export default function BookSection({ title }: PropTypes) {
	const { section, heading } = styles;
	return (
		<section className={section}>
			<h2 className={heading}>{title}</h2>
			<BookSwiper hasShowMore={false} />
		</section>
	);
}
