"use client";

import { usePathname, useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import useSWR from "swr";
import useScrollDownCheck from "@/hooks/useScrollDownCheck";
import { cls } from "@/lib/front/cls";
import { ArrowLeftIcon, CartIcon, LinkIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { BookDescTypes } from "../BookInfo";
import { noRevalidationOption, searchFetcherXML } from "@/lib/front/fetchers";
import { useState } from "react";
import ToastPopup from "@/components/common/ToastPopup";

export default function ButtonGroup() {
	const { wrapper, leftGroup, hasScrolled } = styles;

	const hasScrolledDown = useScrollDownCheck();

	// 백 버튼
	const router = useRouter();
	const goBack = () => router.back();

	// 주소 클립보드 복사
	const [isToastVisible, setIsToastVisible] = useState(false);
	const pathname = usePathname();
	const handleCopyClipBoard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			// alert("클립보드에 링크가 복사되었어요.");
			setIsToastVisible(true);
		} catch (err) {
			console.log(err);
		}
	};

	const onClickLink = () => handleCopyClipBoard(`${process.env.NEXT_PUBLIC_BASE_URL}${pathname}`);

	// 책 구매 페이지 띄우기
	const params = useParams();
	const { data } = useSWR<BookDescTypes>(`/openapi/v1/search/book_adv.xml?d_isbn=${params.isbn}`, searchFetcherXML, noRevalidationOption);

	return (
		<>
			<div className={cls(wrapper, hasScrolledDown ? hasScrolled : "")}>
				<button type="button" onClick={goBack}>
					<ArrowLeftIcon />
				</button>
				<div className={leftGroup}>
					{data && (
						<>
							<button type="button" onClick={onClickLink}>
								<LinkIcon />
							</button>
							<a href={data.link} target="_blank">
								<CartIcon />
							</a>
						</>
					)}
				</div>
			</div>
			{isToastVisible && (
				<ToastPopup isToastVisible={isToastVisible} setIsToastVisible={setIsToastVisible}>
					페이지 주소를 복사했어요 :)
				</ToastPopup>
			)}
		</>
	);
}
