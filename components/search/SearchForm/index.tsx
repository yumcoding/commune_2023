"use client";

import { FormEvent, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import styles from "./styles.module.scss";
import { CloseMarkIcon, SearchIcon } from "@/assets/icons";

export default function SearchForm() {
	const { form, searchIconWrapper, searchClearBtn } = styles;

	const inputRef = useRef<HTMLInputElement>(null);

	const searchParams = useSearchParams();

	const search = searchParams.get("query");

	const onClickClear = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	useEffect(() => {
		if (inputRef.current && search && search.length > 0) {
			inputRef.current.value = search;
		}
	}, []);

	const router = useRouter();

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push(`/search?query=${inputRef.current?.value}&pageIndex=1`);
	};

	return (
		<>
			<form onSubmit={onSubmit} className={form}>
				<div className={searchIconWrapper}>
					<SearchIcon />
				</div>
				<input type="text" ref={inputRef} />
				<button type="button" className={searchClearBtn} onClick={onClickClear}>
					<CloseMarkIcon />
				</button>
			</form>
		</>
	);
}
