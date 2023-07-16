"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import useSwiperRef from "@/hooks/useSwiperRef";
import Book from "@/components/common/Book";
import { cls } from "@/lib/front/cls";
import { ChevronLeftIcon, ChevronRightIcon } from "@/assets/icons";
import styles from "./styles.module.scss";
import ShowMoreBookSlide from "../ShowMoreBookSlide";
import DefaultModalOverlay from "../Modal/DefaultModalOverlay";
import MoreReviewModalContent from "@/components/library/MoreReviewModalContent";

// TODO: 책 리스트 데이터 추가
interface BookSwiperPropTypes {
	hasShowMore: boolean;
}

export default function BookSwiper({ hasShowMore }: BookSwiperPropTypes) {
	const { swiperWrapper, btn, prevBtn, nextBtn } = styles;

	const [prevEl, prevElRef] = useSwiperRef<HTMLButtonElement>();
	const [nextEl, nextElRef] = useSwiperRef<HTMLButtonElement>();

	const swiperParams = {
		slidesPerView: 3,
		breakpoints: {
			720: {
				slidesPerView: 4,
			},
			1366: {
				slidesPerView: 5,
			},
		},
		spaceBetween: 10,
		modules: [Navigation],
		navigation: {
			prevEl,
			nextEl,
		},
	};

	// 준비 중 모달
	const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);
	const onClickMoreReview = () => setIsReviewModalVisible(true);
	const onClickClose = () => setIsReviewModalVisible(false);

	return (
		<>
			<div className={swiperWrapper}>
				<Swiper {...swiperParams}>
					{/* TODO: 책 리스트 데이터 */}
					{[0, 1, 2, 3, 4, 5].map((item, i) => (
						<SwiperSlide key={i}>{/* <Book /> */}</SwiperSlide>
					))}
					{hasShowMore ? (
						<SwiperSlide key="show-more-btn">
							<ShowMoreBookSlide onClickMoreReview={onClickMoreReview} />
						</SwiperSlide>
					) : (
						""
					)}
				</Swiper>
				<button type="button" ref={prevElRef} className={cls(btn, prevBtn)}>
					<ChevronLeftIcon />
				</button>
				<button type="button" ref={nextElRef} className={cls(btn, nextBtn)}>
					<ChevronRightIcon />
				</button>
			</div>

			{isReviewModalVisible && (
				<DefaultModalOverlay onClickOverlay={onClickClose}>
					<MoreReviewModalContent onClickClose={onClickClose} />
				</DefaultModalOverlay>
			)}
		</>
	);
}
