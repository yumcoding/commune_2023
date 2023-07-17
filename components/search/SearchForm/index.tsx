"use client";

import { FormEvent, useState, useRef, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import { CloseMarkIcon, SearchIcon } from "@/assets/icons";
import { SearchQueryContext } from "@/providers/searchQueryProvider";

export default function SearchForm() {
	const { form, searchIconWrapper, searchClearBtn } = styles;

	const inputRef = useRef<HTMLInputElement>(null);

	const { setQuery } = useContext(SearchQueryContext);

	const onClickClear = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
		}
		setQuery("");
	};

	useEffect(() => {
		return () => {
			setQuery("");
		};
	}, [setQuery]);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setQuery(inputRef.current?.value);
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
