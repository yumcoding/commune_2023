"use client";

import { FormEvent, useState, useRef, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import { CloseMarkIcon, SearchIcon } from "@/assets/icons";
import { SearchQueryContext } from "@/providers/searchQueryProvider";
import { useRouter } from "next/navigation";

export default function SearchForm() {
	const { form, searchIconWrapper, searchClearBtn } = styles;

	const inputRef = useRef<HTMLInputElement>(null);

	const { query, setQuery } = useContext(SearchQueryContext);

	const onClickClear = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
		}
		setQuery("");
	};

	useEffect(() => {
		if (inputRef.current && query && query?.length > 0) {
			inputRef.current.value = query;
		}
	}, [query]);

	useEffect(() => {
		return () => {
			setQuery("");
		};
	}, [setQuery]);

	const router = useRouter();

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setQuery(inputRef.current?.value);
		router.push(`/search?query=${inputRef.current?.value}`);
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
