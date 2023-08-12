"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

import { ChevronLeftIcon, CloseMarkIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { cls } from "@/lib/front/cls";
import { noRevalidationOption, searchFetcherXML } from "@/lib/front/fetchers";
import useMutation from "@/hooks/useMutation";
import { BookDescTypes, ReviewMutationTypes } from "@/types/db";

export default function ReviewWriteModalContent({ isModal }: { isModal: boolean }) {
	const { wrapper, isPage, header, closeBtn, saveBtn, saveActive, formWrapper, counter, backBtn } = styles;
	const params = useParams();
	const { data: searchData } = useSWR<BookDescTypes>(`/openapi/v1/search/book_adv.xml?d_isbn=${params.isbn}`, searchFetcherXML, noRevalidationOption);

	const router = useRouter();
	const onClickClose = () => router.back();

	const [title, setTitle] = useState("");
	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

	const [content, setContent] = useState("");
	const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

	const [mutateData, { mutateLoading, mutateResult }] = useMutation<ReviewMutationTypes>(`/api/book/${params.isbn}/reviews`, "POST");

	useEffect(() => {
		if (mutateResult?.ok) {
			// router.replace(`/book/${params.isbn}`);
			// TODO : router.replace 시 url은 변경되는데 화면 리로드 되지 않음
			window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/book/${params.isbn}`;
		}
	}, [mutateResult, router, params.isbn]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (mutateLoading) return;
		if (searchData && title?.length > 0 && content?.length > 0) {
			mutateData({
				title,
				content,
				bookIsbn: searchData.isbn,
				bookAuthor: searchData.author,
				bookTitle: searchData.title,
				bookImage: searchData.image,
			});
		}
	};

	return (
		<>
			<section className={cls(wrapper, isModal ? "" : isPage)}>
				<header className={header}>
					<h1>{searchData ? searchData.title : ""}</h1>
					<button type="button" className={closeBtn} onClick={onClickClose}>
						<CloseMarkIcon />
					</button>
				</header>
				<div className={formWrapper}>
					<form onSubmit={onSubmit}>
						<input type="text" placeholder="리뷰 제목을 정해주세요:)" value={title} onChange={onChangeTitle} />
						<textarea placeholder="책에 대해 자유롭게 의견을 남겨주세요!" value={content} onChange={onChangeContent}></textarea>
						<button type="submit" className={cls(saveBtn, content?.length > 0 ? saveActive : "")} disabled={content?.length > 0 ? false : true}>
							저장
						</button>
					</form>
					<p className={counter}>{content?.length} / 1000</p>
				</div>
				<button type="button" className={backBtn} onClick={onClickClose}>
					<ChevronLeftIcon />
					뒤로가기
				</button>
			</section>
		</>
	);
}
