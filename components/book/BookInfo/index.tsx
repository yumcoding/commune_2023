"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import { searchFetcherXML } from "@/lib/front/fetchers";
import convertStrToDate from "@/lib/front/convertStrToDate";
import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";

export interface BookDescTypes {
	author: string;
	description: string;
	discount: string;
	image: string;
	isbn: string;
	link: string;
	pubdate: string;
	publisher: string;
	title: string;
}

export default function BookInfo() {
	const { section, bookWrapper, book, bookInfo, bookImg, sectionContentWrapper, summary } = styles;

	const params = useParams();
	const { data } = useSWR<BookDescTypes>(`/openapi/v1/search/book_adv.xml?d_isbn=${params.isbn}`, searchFetcherXML, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});

	return (
		<>
			<div className={bookWrapper}>
				<div className={book}>
					<div className={bookImg}>{data?.image && <Image src={data.image} alt={`${data.title} 책 표지`} fill sizes="(min-width:720px) 153px, (min-width:1366px) 166px, 80px" />}</div>
					<div className={bookInfo}>
						{data ? (
							<>
								<h1>{data.title}</h1>
								<p>{`${data.author} | ${data.publisher} | ${convertStrToDate(data.pubdate)} `}</p>
							</>
						) : (
							""
						)}
					</div>
				</div>
			</div>

			<section className={cls(section, summary)}>
				<div className={sectionContentWrapper}>
					<h2>책 소개</h2>
					{data && <p>{data.description}</p>}
				</div>
			</section>
		</>
	);
}
