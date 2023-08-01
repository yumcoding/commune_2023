"use client";

import { useRouter } from "next-router-mock";
import { useEffect } from "react";

export default function PopDetector({ children }: { children: React.ReactNode }) {
	// const router = useRouter();

	// useEffect(() => {
	// 	console.log("hey");
	// 	const start = () => {
	// 		console.log("working");
	// 	};
	// 	router.events.on("routeChangeComplete", start);

	// 	return () => {
	// 		router.events.off("routeChangeComplete", start);
	// 	};
	// }, [router]);

	const popHandler = function () {
		sessionStorage.setItem("isBack", "true");
		console.log("poppppp");
	};

	useEffect(() => {
		window.addEventListener("popstate", popHandler);

		return () => {
			window.removeEventListener("popstate", popHandler);
		};
	});

	return <>{children}</>;
}
