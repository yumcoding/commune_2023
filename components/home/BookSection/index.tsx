"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Book from "@/components/common/Book";
import styles from "./styles.module.scss";
import { cls } from "@/lib/front/cls";
import useSwiperRef from "@/hooks/useSwiperRef";
import { ChevronLeft, ChevronRight } from "@/assets/icons";

interface PropTypes {
	title: string;
}

export default function BookSection({ title }: PropTypes) {
	const { section, heading, swiperWrapper, btn, prevBtn, nextBtn } = styles;

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

	return (
		<section className={section}>
			<h2 className={heading}>{title}</h2>
			<div className={swiperWrapper}>
				<Swiper {...swiperParams}>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
						<SwiperSlide key={i}>
							<Book />
						</SwiperSlide>
					))}
				</Swiper>
				<button type="button" ref={prevElRef} className={cls(btn, prevBtn)}>
					<ChevronLeft />
				</button>
				<button type="button" ref={nextElRef} className={cls(btn, nextBtn)}>
					<ChevronRight />
				</button>
			</div>
		</section>
	);
}
