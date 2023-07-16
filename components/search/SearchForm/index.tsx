"use client";

import { FormEvent, useState, useRef, useContext } from "react";
import styles from "./styles.module.scss";
import { CloseMarkIcon, SearchIcon } from "@/assets/icons";
import { SearchQueryContext } from "@/providers/searchQueryProvider";

export default function SearchForm() {
	const { form, searchIconWrapper, searchClearBtn } = styles;

	const inputRef = useRef<HTMLInputElement>(null);

	const { setQuery } = useContext(SearchQueryContext);

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
				<button type="button" className={searchClearBtn}>
					<CloseMarkIcon />
				</button>
			</form>
		</>
	);
}
