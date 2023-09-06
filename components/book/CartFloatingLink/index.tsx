"use client";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { noRevalidationOption, searchFetcherXML } from "@/lib/front/fetchers";
import { CartIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { BookDescTypes } from "@/types/db";

export default function CartFloatingLink() {
	// 책 구매 페이지 띄우기
	const params = useParams();
	const { data } = useSWR<BookDescTypes>(`/openapi/v1/search/book_adv.xml?d_isbn=${params.isbn}`, searchFetcherXML, noRevalidationOption);

	return (
		<>
			{data && (
				<div className={styles.cart}>
					<a href={data.link} target="_blank">
						<CartIcon />
					</a>
				</div>
			)}
		</>
	);
}
