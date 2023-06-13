import { useEffect } from "react";

export default function useBlockBodyScroll() {
	return useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, []);
}
