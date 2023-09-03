"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SwiperItemTypes } from "../BookSwiper";
import Book from "../Book";
import ListLoading from "@/components/home/ListLoading";

interface SlickPropsTypes {
	hasShowMore?: boolean;
	list?: SwiperItemTypes[];
	isLoading?: boolean;
}

export const sliderSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 5,
	slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 1366,
			settings: {
				slidesToShow: 4,
				slidesToScroll: 4,
			},
		},
		{
			breakpoint: 720,
			settings: {
				slidesToShow: 3,
				slidesToScroll: 3,
			},
		},
	],
};

export default function BookSlider({ list, isLoading }: SlickPropsTypes) {
	if (isLoading) return <ListLoading />;

	return (
		<>
			<Slider {...sliderSettings}>
				{list?.map((item) => (
					<Book key={crypto.randomUUID()} item={item} />
				))}
			</Slider>
		</>
	);
}
