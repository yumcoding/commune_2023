"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";

export default function ListLoading() {
	const { list, bookImg, bookDesc } = styles;

	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const sliderNum = width < 720 ? 3 : width < 1366 ? 4 : 5;

	return (
		<ul className={list}>
			{Array.from({ length: sliderNum }).map((_, i) => (
				<li key={crypto.randomUUID()}>
					<div className={bookImg} />
					<div className={bookDesc} />
				</li>
			))}
		</ul>
	);
}
