"use client";

import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import useSWR from "swr";
import useScrollDownCheck from "@/hooks/useScrollDownCheck";
import { cls } from "@/lib/front/cls";
import { ArrowLeftIcon, CartIcon, LinkIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { BookDescTypes } from "../BookInfo";
import { searchFetcherXML } from "@/lib/front/fetchers";

export default function ButtonGroup() {
	const { wrapper, leftGroup, hasScrolled } = styles;

	const hasScrolledDown = useScrollDownCheck();

	const router = useRouter();
	const goBack = () => router.back();

	const params = useParams();
	const { data } = useSWR<BookDescTypes>(`/openapi/v1/search/book_adv.xml?d_isbn=${params.isbn}`, searchFetcherXML, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return (
		<>
			<div className={cls(wrapper, hasScrolledDown ? hasScrolled : "")}>
				<button type="button" onClick={goBack}>
					<ArrowLeftIcon />
				</button>
				<div className={leftGroup}>
					{data && (
						<>
							<button type="button">
								<LinkIcon />
							</button>
							<a href={data.link} target="_blank">
								<CartIcon />
							</a>
						</>
					)}
				</div>
			</div>
		</>
	);
}
