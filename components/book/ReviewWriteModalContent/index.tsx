"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useSWR from "swr";

import { ChevronLeftIcon, CloseMarkIcon, DeleteIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import { cls } from "@/lib/front/cls";
import { fetcher, noRevalidationOption, searchFetcherXML } from "@/lib/front/fetchers";
import useMutation from "@/hooks/useMutation";
import { BookDescTypes, ReviewMutationTypes } from "@/types/db";
import StarRating from "@/components/common/StarRating";
import { useSession } from "next-auth/react";

export default function ReviewWriteModalContent({ isModal }: { isModal: boolean }) {
	const { wrapper, flexbox, isPage, header, closeBtn, saveBtn, saveActive, formWrapper, textareaWrapper, counter, ratingWrapper, deleteBtn } = styles;
	const params = useParams();
	const { data: searchData } = useSWR<BookDescTypes>(`/openapi/v1/search/book_adv.xml?d_isbn=${params.isbn}`, searchFetcherXML, noRevalidationOption);

	const session = useSession();
	const userId = session?.data?.user?.id;
	const { data: myReview } = useSWR(userId ? `/api/book/${params.isbn}/reviews/user` : null, fetcher);

	const router = useRouter();
	const onClickClose = () => router.back();

	const [title, setTitle] = useState("");
	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

	const [content, setContent] = useState("");
	const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

	const [rating, setRating] = useState(0);

	useEffect(() => {
		if (myReview?.review) {
			setTitle(myReview.review.title);
			setContent(myReview.review.content);
			setRating(myReview.review.rating);
		}
	}, [myReview]);

	const [mutateData, { mutateLoading, mutateResult }] = useMutation<ReviewMutationTypes>(`/api/book/${params.isbn}/reviews/user`, "POST");
	const [patchData, { mutateLoading: patchLoading, mutateResult: patchResult }] = useMutation<ReviewMutationTypes>(`/api/book/${params.isbn}/reviews/${myReview?.review?.id}`, "PATCH");
	const [deleteData, { mutateLoading: deleteLoading, mutateResult: deleteResult }] = useMutation<ReviewMutationTypes>(`/api/book/${params.isbn}/reviews/${myReview?.review?.id}`, "DELETE");

	useEffect(() => {
		if (mutateResult?.ok || patchResult?.ok || deleteResult?.ok) {
			// router.replace(`/book/${params.isbn}`);
			// TODO : router.replace 시 url은 변경되는데 화면 리로드 되지 않음
			window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/book/${params.isbn}`;
		}
	}, [mutateResult, patchResult, deleteResult, router, params.isbn]);

	const onClickDelete = () => deleteData({});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (mutateLoading || patchLoading || deleteLoading) return;

		if (searchData && title?.length > 0 && content?.length > 0) {
			if (myReview?.review) {
				patchData({
					title,
					content,
					rating,
				});
			} else {
				mutateData({
					title,
					content,
					rating,
					bookIsbn: searchData.isbn,
					bookAuthor: searchData.author,
					bookTitle: searchData.title,
					bookImage: searchData.image,
				});
			}
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
						<div className={textareaWrapper}>
							<textarea placeholder="책에 대해 자유롭게 의견을 남겨주세요!" value={content} onChange={onChangeContent}></textarea>
							<p className={counter}>{content?.length} / 1000</p>
						</div>
						<div className={flexbox}>
							<div className={ratingWrapper}>
								<p>별점&nbsp;</p>
								<StarRating rating={rating} setRating={setRating} />
							</div>
				
							{myReview?.review && (
								<button type="button" onClick={onClickDelete} className={deleteBtn} aria-label="리뷰 삭제">
									<DeleteIcon />
									{/* 삭제 */}
								</button>
							)}
							<button type="submit" className={cls(saveBtn, content?.length > 0 ? saveActive : "")} disabled={content?.length > 0 ? false : true}>
								저장
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
