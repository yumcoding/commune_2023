"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import { noRevalidationOption, searchFetcherXML } from "@/lib/front/fetchers";
import convertStrToDate from "@/lib/front/convertStrToDate";
import { cls } from "@/lib/front/cls";
import styles from "./styles.module.scss";
import { BookDescTypes } from "@/types/db";
import { HorizontalLoaderIcon } from "@/assets/icons";
import sectionStyles from "@/app/book/[isbn]/styles.module.scss";

export default function BookInfo() {
	const { section } = sectionStyles;
	const { bookWrapper, book, bookInfo, bookImg, summary, loadingWrapper } = styles;

	const params = useParams();
	const { data, isLoading } = useSWR<BookDescTypes>(`/openapi/v1/search/book_adv.xml?d_isbn=${params.isbn}`, searchFetcherXML, noRevalidationOption);

	return (
		<>
			<div className={bookWrapper}>
				<div className={book}>
					<div className={bookImg}>{data?.image && <Image src={data.image} alt={`${data.title} 책 표지`} fill sizes="(min-width:720px) 153px, (min-width:1366px) 166px, 80px" />}</div>
					<div className={bookInfo}>
						{data ? (
							<>
								<h1>{data.title}</h1>
								<p>{`${data.author.replaceAll("^", ", ")} | ${data.publisher} | ${convertStrToDate(data.pubdate)} `}</p>
							</>
						) : (
							""
						)}
					</div>
				</div>
			</div>

			<section className={cls(section, summary)}>
				<div>
					<h2>책 소개</h2>
					{isLoading && (
						<div className={loadingWrapper}>
							<HorizontalLoaderIcon />
						</div>
					)}
					{!isLoading && data && <p>{data.description}</p>}
				</div>
			</section>
		</>
	);
}
