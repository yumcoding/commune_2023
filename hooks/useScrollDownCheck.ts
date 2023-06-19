import { useState, useEffect } from "react";

export default function useScrollDownCheck() {
	const [hasScrolledDown, setHasScrolledDown] = useState(false);

	const changeBorder = () => {
		if (window.scrollY > 0) {
			setHasScrolledDown(true);
		} else {
			setHasScrolledDown(false);
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", changeBorder);
		return () => {
			window.removeEventListener("scroll", changeBorder);
		};
	}, []);

	return hasScrolledDown;
}
