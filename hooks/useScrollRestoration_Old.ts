"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import useDebounce from "./useDebounce";

const useScrollRestoration_Old = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const params = new URLSearchParams(Object.fromEntries(searchParams.entries()));
	const stringParams = params.toString();
	const fullRoute = pathname + "?" + stringParams;

	const paddingFunction = useDebounce({
		cb: () => sessionStorage.setItem(fullRoute, window.scrollY.toString()),
		ms: 100,
	});

	useEffect(() => {
		const backHandler = function () {
			sessionStorage.setItem("isBack", "true");
		};

		const scrollHandler = function () {
			paddingFunction();
		};

		const isHistoryBack = sessionStorage.getItem("isBack") === "true" ? true : false;
		const prevPage = sessionStorage.getItem("prevPage");

		if (isHistoryBack && fullRoute === prevPage) {
			const scrollY = Number(sessionStorage.getItem(fullRoute));

			window.scrollTo({ top: scrollY, left: 0 });
			// sessionStorage.setItem("isBack", "false");
			// sessionStorage.setItem("prevPage", "");
			sessionStorage.removeItem("isBack");
			sessionStorage.removeItem("prevPage");
			sessionStorage.removeItem("fullRoute");
		}

		window.addEventListener("popstate", backHandler);
		window.addEventListener("scroll", scrollHandler);
		sessionStorage.setItem("prevPage", fullRoute);

		return () => {
			window.removeEventListener("popstate", backHandler);
			window.removeEventListener("scroll", scrollHandler);
		};
	}, [fullRoute, pathname, paddingFunction]);
};

export default useScrollRestoration_Old;

// scrollY
// historyBack
// startIndex

// startIndex 넣어야함
// isHistoryBack 이용해서 back버튼 눌려서 온 건지 아니면 그냥 검색한 건지 구분해서 스크롤링 해야함
