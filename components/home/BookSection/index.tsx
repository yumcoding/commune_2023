"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Book from "@/components/common/Book";
import styles from "./styles.module.scss";

interface PropTypes {
	title: string;
}

export default function BookSection({ title }: PropTypes) {
	const { heading, bookList, bookItem } = styles;

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
		navigation: true,
		modules: [Navigation],
		// navigation: {
		// 	nextEl: ".swiper-button-next",
		// 	prevEl: ".swiper-button-prev",
		// },
	};

	return (
		<section>
			<h2 className={heading}>{title}</h2>
			<Swiper {...swiperParams} className={bookList}>
				{[0, 1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
					<SwiperSlide key={i} className={bookItem}>
						<Book />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
}
