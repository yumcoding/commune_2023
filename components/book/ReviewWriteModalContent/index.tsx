"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { fetcher, noRevalidationOption, searchFetcherXML } from "@/lib/front/fetchers";
import useMutation from "@/hooks/useMutation";
import { BookDescTypes, ReviewMutationTypes } from "@/types/db";
import styles from "./styles.module.scss";
import { cls } from "@/lib/front/cls";
import StarRatingBtn from "@/components/common/StarRatingBtn";
import { AlertIcon, CloseMarkIcon, DeleteIcon } from "@/assets/icons";
import DefaultModalOverlay from "@/components/common/Modal/DefaultModalOverlay";

export default function ReviewWriteModalContent({ isModal, setIsModalVisible }: { isModal: boolean; setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>> }) {
	const { wrapper, flexbox, isPage, header, closeBtn, saveBtn, saveActive, formWrapper, textareaWrapper, counter, ratingWrapper, deleteBtn, deleteModalWrapper } = styles;
	const params = useParams();
	const { data: searchData } = useSWR<BookDescTypes>(`/openapi/v1/search/book_adv.xml?d_isbn=${params.isbn}`, searchFetcherXML, noRevalidationOption);

	const session = useSession();
	const userId = session?.data?.user?.id;
	const { data: myReview, mutate: mutateMyReview } = useSWR(userId ? `/api/book/${params.isbn}/reviews/user` : null, fetcher);

	const [title, setTitle] = useState("");
	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);

	const [content, setContent] = useState("");
	const onChangeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

	const [rating, setRating] = useState(0);

	const router = useRouter();
	const handleCloseModal = () => setIsModalVisible(false);

	useEffect(() => {
		if (myReview?.data) {
			setTitle(myReview.data.title);
			setContent(myReview.data.content);
			setRating(myReview.data.rating ?? 0);
		}
	}, [myReview]);

	const [mutateData, { mutateLoading, mutateResult }] = useMutation<ReviewMutationTypes>(`/api/book/${params.isbn}/reviews/user`, "POST");
	const [patchData, { mutateLoading: patchLoading, mutateResult: patchResult }] = useMutation<ReviewMutationTypes>(`/api/book/${params.isbn}/reviews/${myReview?.data?.id}`, "PATCH");
	const [deleteData, { mutateLoading: deleteLoading, mutateResult: deleteResult }] = useMutation<ReviewMutationTypes>(`/api/book/${params.isbn}/reviews/${myReview?.data?.id}`, "DELETE");

	useEffect(() => {
		if (mutateResult?.ok || patchResult?.ok || deleteResult?.ok) {
			mutateMyReview();
			handleCloseModal();
		}
	}, [mutateResult, patchResult, deleteResult, router, params.isbn]);

	const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
	const onClickDeleteBtn = () => setIsDeleteModalVisible(true);
	const onClickCancelDeleteBtn = () => setIsDeleteModalVisible(false);
	const onClickConfirmDelete = () => deleteData({});

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (mutateLoading || patchLoading || deleteLoading) return;

		if (searchData && title?.length > 0 && content?.length > 0 && session?.data?.user) {
			if (myReview?.data) {
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
					<button type="button" className={closeBtn} onClick={handleCloseModal}>
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
								<StarRatingBtn rating={rating} setRating={setRating} />
							</div>

							{myReview?.data && (
								<button type="button" onClick={onClickDeleteBtn} className={deleteBtn} aria-label="리뷰 삭제">
									<DeleteIcon />
								</button>
							)}
							<button type="submit" className={cls(saveBtn, content?.length > 0 ? saveActive : "")} disabled={content?.length > 0 ? false : true}>
								저장
							</button>
						</div>
					</form>
				</div>
			</section>
			{isDeleteModalVisible && (
				<DefaultModalOverlay onClickOverlay={onClickCancelDeleteBtn}>
					<div className={deleteModalWrapper}>
						<AlertIcon />
						<div>
							<p>삭제 확인 후에는 </p>
							<p>리뷰를 되돌릴 수 없어요.😭</p>
						</div>

						<p>작성한 리뷰를 삭제하시겠습니까?</p>

						<div>
							<button type="button" onClick={onClickCancelDeleteBtn}>
								삭제 취소
							</button>
							<button type="button" onClick={onClickConfirmDelete}>
								삭제 확인
							</button>
						</div>
					</div>
				</DefaultModalOverlay>
			)}
		</>
	);
}
