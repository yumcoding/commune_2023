"use client";
import { FormEvent, useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@/assets/icons";
import { cls } from "@/lib/front/cls";
import SearchRecommendation from "@/components/search/SearchRecommendation";
import styles from "./styles.module.scss";

export default function Search() {
	const { searchWrapper, search, visible, searchDropdown } = styles;

	const [isSearchVisible, setIsSearchVisible] = useState(false);

	// toggle input on click
	const searchRef = useRef<HTMLFormElement>(null);

	const showSearch = () => {
		if (!isSearchVisible) {
			return setIsSearchVisible(true);
		} else {
			return;
		}
	};

	useEffect(() => {
		const checkIfClickedOutside = (e: MouseEvent): void => {
			if (isSearchVisible && searchRef.current && (e.target instanceof HTMLElement || e.target instanceof SVGElement) && !searchRef.current.contains(e.target)) {
				setIsSearchVisible(false);
			}
		};

		document.addEventListener("mousedown", checkIfClickedOutside);
		return () => {
			document.removeEventListener("mousedown", checkIfClickedOutside);
		};
	}, [isSearchVisible, setIsSearchVisible]);

	// 검색어
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);

	const onSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSearchVisible(false);
		router.push(`/search?query=${inputRef.current?.value}&pageIndex=1`);
	};

	return (
		<div className={searchWrapper}>
			<form className={cls(search, isSearchVisible ? visible : "")} ref={searchRef} onClick={showSearch} onSubmit={onSearchSubmit}>
				<input type="text" placeholder="궁금한 책, 영화, 음악을 검색해봐요 :)" ref={inputRef} />
				<SearchIcon />
			</form>
			{/* TODO : 검색어 추천 2차 DB 완성 후  */}
			{/* {isSearchVisible && (
				<div className={searchDropdown}>
					<SearchRecommendation isRecent={true} />
					<SearchRecommendation isRecent={false} />
				</div>
			)} */}
		</div>
	);
}
