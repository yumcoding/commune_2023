"use client";

import { FormEvent, useState } from "react";
import styles from "./styles.module.scss";
import { CloseMarkIcon, SearchIcon } from "@/assets/icons";
export default function SearchForm() {
	const { form, searchIconWrapper, searchClearBtn } = styles;
	const [query, setQuery] = useState("");
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<>
			<form onSubmit={onSubmit} className={form}>
				<div className={searchIconWrapper}>
					<SearchIcon />
				</div>
				<input type="text" />
				<button type="button" className={searchClearBtn}>
					<CloseMarkIcon />
				</button>
			</form>
		</>
	);
}
