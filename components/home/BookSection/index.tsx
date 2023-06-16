"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

import Book from "@/components/common/Book";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";

interface PropTypes {
	title: string;
}

export default function BookSection({ title }: PropTypes) {
	const { heading, bookList, bookItem } = styles;

	const [numOfSlides, setNumOfSlides] = useState(3);

	useEffect(() => {
		function handleResize() {
			let vw = window.innerWidth;
			if (vw < 720) {
				setNumOfSlides(3);
			} else if (vw >= 720 && vw < 1366) {
				setNumOfSlides(4);
			} else {
				setNumOfSlides(5);
			}
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const swiperParams = {
		slidesPerView: numOfSlides,
		spaceBetween: 10,
		navigation: true,
		modules: [Navigation],
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
