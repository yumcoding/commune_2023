"use client";

import { useEffect } from "react";

export default function DetectPopState({ children }: { children: React.ReactNode }) {
	const popHandler = function () {
		sessionStorage.setItem("isBack", "true");
	};

	useEffect(() => {
		window.addEventListener("popstate", popHandler);

		return () => {
			window.removeEventListener("popstate", popHandler);
		};
	});

	return <>{children}</>;
}
